import { Directive, ElementRef, inject, Input, OnDestroy } from '@angular/core';
import { ResizeObserverService } from '../services/resize-observer.service';

@Directive({
	selector: '[infOverflowCheck]',
	standalone: true,
	exportAs: 'infOverflowCheck',
	providers: [ResizeObserverService],
})
export class OverflowCheckDirective implements OnDestroy {
	readonly #hostElement = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
	readonly #resizeObserverService = this.#getResizeObserverService();

	/**
	 * If set to `true`, the directive will not log a warning when no ancestor `OverflowCheckContainerDirective` is found.
	 * If you are dealing with a small amount of elements (or even a single element) that are being observed, adding
	 * the container element could be unnecessary. In that case, feel free to suppress this warning.
	 */
	@Input() public suppressMissingContainerWarning = false;

	public readonly $isOverflowing = this.#resizeObserverService.register(this.#hostElement.nativeElement);

	public ngOnDestroy(): void {
		this.#resizeObserverService.unregister(this.#hostElement.nativeElement);
	}

	#getResizeObserverService(): ResizeObserverService {
		const containerServiceInstance = inject(ResizeObserverService, { skipSelf: true, optional: true });

		if (containerServiceInstance) {
			return containerServiceInstance;
		}

		if (!this.suppressMissingContainerWarning) {
			console.warn(
				'You are using OverflowCheckDirective without an ancestor OverflowCheckContainerDirective. This can cause performance issues for large number of elements. Consider adding OverflowCheckContainerDirective to the parent element.'
			);
		}

		return inject(ResizeObserverService);
	}
}
