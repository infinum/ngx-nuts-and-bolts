import { Component, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InViewDirective } from './in-view.directive';

@Component({
	selector: 'inf-host-element',
	imports: [InViewDirective],
	template: `<div infInView #inViewDirective="infInView">{{ inViewDirective.isInView }}</div>`,
})
class HostElementComponent {
	public readonly inViewDirective = viewChild<InViewDirective>('inViewDirective');
}

describe('InViewDirective', () => {
	let directive: InViewDirective | undefined = undefined;
	let callbackParams$: Subject<Array<IntersectionObserverEntry>>;

	beforeEach(() => {
		callbackParams$ = new Subject<Array<IntersectionObserverEntry>>();

		// Mock IntersectionObserver
		class MockIntersectionObserver implements IntersectionObserver {
			public readonly root: Element | null = null;
			public readonly rootMargin: string = '0px';
			public readonly thresholds: ReadonlyArray<number> = [0];

			private callbacksCallsSub?: Subscription;

			constructor(private callback: IntersectionObserverCallback) {}

			public observe(): void {
				this.callbacksCallsSub = callbackParams$.pipe(tap((params) => this.callback(params, this))).subscribe();
			}

			public disconnect(): void {
				this.callbacksCallsSub?.unsubscribe();
			}

			public takeRecords(): IntersectionObserverEntry[] {
				return [];
			}

			public unobserve(): void {
				// noop
			}
		}

		// Assign IntersectionObserver to global before spying
		(global as any).IntersectionObserver = jest
			.fn()
			.mockImplementation((callback: IntersectionObserverCallback) => new MockIntersectionObserver(callback));

		TestBed.configureTestingModule({
			imports: [HostElementComponent],
		});
	});

	beforeEach(() => {
		const fixture = TestBed.createComponent(HostElementComponent);
		fixture.detectChanges();
		directive = fixture.componentInstance.inViewDirective();
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});

	it('should emit changes and set public property based on IntersectionObserver', () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const inViewCallbackSpy = jest.fn((inView: boolean) => undefined);
		directive = new InViewDirective();
		directive.ngAfterViewInit();
		const inViewSub = directive.inView.subscribe(inViewCallbackSpy);
		callbackParams$.next([{ isIntersecting: false } as IntersectionObserverEntry]);

		expect(inViewCallbackSpy).toHaveBeenCalledTimes(1);
		expect(inViewCallbackSpy.mock.calls[0][0]).toBe(false);
		expect(directive.isInView).toBe(false);

		callbackParams$.next([{ isIntersecting: true } as IntersectionObserverEntry]);
		expect(inViewCallbackSpy.mock.calls[1][0]).toBe(true);
		expect(directive.isInView).toBe(true);

		callbackParams$.next([{ isIntersecting: false } as IntersectionObserverEntry]);
		expect(inViewCallbackSpy.mock.calls[2][0]).toBe(false);
		expect(directive.isInView).toBe(false);

		callbackParams$.next([{ isIntersecting: true } as IntersectionObserverEntry]);
		expect(inViewCallbackSpy.mock.calls[3][0]).toBe(true);
		expect(directive.isInView).toBe(true);

		inViewSub.unsubscribe();
	});
});
