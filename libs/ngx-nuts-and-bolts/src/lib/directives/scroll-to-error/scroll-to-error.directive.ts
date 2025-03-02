import { DOCUMENT } from '@angular/common';
import { Directive, Inject, InjectionToken, Input, OnDestroy, Optional } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { asyncScheduler, combineLatest, EMPTY, Subject, timer } from 'rxjs';
import { filter, finalize, map, observeOn, switchMap, takeUntil } from 'rxjs/operators';

export interface IScrollToErrorConfig {
	errorSelector?: string;
	highlightClass?: string;
	highlightTargetSelector?: string;
	highlightDurationMs?: number;
	scrollOptions?: boolean | ScrollIntoViewOptions;
	focusTargetSelector?: string;
}

export const SCROLL_TO_ERROR_CONFIG = new InjectionToken<IScrollToErrorConfig>('SCROLL_TO_ERROR_CONFIG');

@Directive({
	selector: '[infScrollToError]',
})
export class ScrollToErrorDirective implements OnDestroy {
	@Input('infScrollToError') public errorSelector?: string;
	@Input() public highlightClass?: string = this.config.highlightClass;
	@Input() public highlightTargetSelector?: string = this.config.highlightTargetSelector;
	@Input() public highlightDurationMs?: number = this.config.highlightDurationMs;
	@Input() public scrollOptions?: boolean | ScrollIntoViewOptions = this.config.scrollOptions;
	@Input() public focusTargetSelector?: string = this.config.focusTargetSelector;

	private readonly end$ = new Subject<void>();

	constructor(
		@Inject(SCROLL_TO_ERROR_CONFIG) private readonly config: IScrollToErrorConfig,
		@Inject(DOCUMENT) private readonly document: Document,
		@Optional() controlContainer?: ControlContainer
	) {
		if (!controlContainer) {
			throw new Error('No ControlContainer found');
		}

		this.listenForSubmissions(controlContainer);
	}

	public ngOnDestroy(): void {
		this.end$.next();
		this.end$.complete();
	}

	private listenForSubmissions(controlContainer: ControlContainer): void {
		if (controlContainer instanceof FormGroupDirective) {
			controlContainer.ngSubmit
				.pipe(
					/*
            asyncScheduler is needed because the error is not yet rendered when ngSubmit emits
            in the case when the errors are not displayed if the form is not submitter
          */
					observeOn(asyncScheduler),
					filter(() => {
						return Boolean(controlContainer.invalid);
					}),
					map(() => {
						const errorSelector = this.errorSelector || this.config.errorSelector;
						if (!errorSelector) {
							throw new Error('Please provide a error selecor');
						}

						return this.document.querySelectorAll(errorSelector);
					}),
					switchMap((errorElements) => {
						if (this.focusTargetSelector) {
							const focusTarget = this.findFocusTargetElement(errorElements[0], this.focusTargetSelector);
							(focusTarget as HTMLElement | undefined)?.focus();
						}

						if (!this.highlightClass || !this.highlightTargetSelector) {
							errorElements[0]?.scrollIntoView(this.scrollOptions);

							return EMPTY;
						}

						const highlightTargets = Array.from(errorElements).map((errorElement) => {
							return this.findHighlightTarget(errorElement, errorElement);
						});

						highlightTargets[0]?.scrollIntoView(this.scrollOptions);

						const hightlightTimers = highlightTargets.map((highlightTarget) => {
							setTimeout(() => {
								/*
                  Set timeout required in case where the user spams submissions and the timer gets interrupted.
                  The issue is that class removal from finalize from the previous loop is executed after the class is added in the new loop.
                  We can move the current loop's class addition to after the previous loop's class removal in finalize by using setTimeout.

                  TODO: Find a smarter solution
                */
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								highlightTarget.classList.add(this.highlightClass!);
							});

							return timer(this.highlightDurationMs).pipe(
								finalize(() => {
									// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
									highlightTarget.classList.remove(this.highlightClass!);
								})
							);
						});

						return combineLatest(hightlightTimers);
					}),
					takeUntil(this.end$)
				)
				.subscribe();
		}
	}

	private findHighlightTarget(element: Element, startingElement: Element): Element {
		if (!this.highlightTargetSelector) {
			return startingElement;
		}

		if (element.matches(this.highlightTargetSelector)) {
			return element;
		}

		if (!element.parentElement) {
			return startingElement;
		}

		return this.findHighlightTarget(element.parentElement, startingElement);
	}

	private findFocusTargetElement(element: Element, selector: string): Element | undefined {
		const parent = element.parentElement;

		if (!parent) {
			return undefined;
		}

		const focusTarget = parent.querySelector(selector);

		if (focusTarget) {
			return focusTarget;
		}

		return this.findFocusTargetElement(parent, selector);
	}
}
