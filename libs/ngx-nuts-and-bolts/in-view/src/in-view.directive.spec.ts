import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InViewDirective } from './in-view.directive';

describe('InViewDirective', () => {
	let directive: InViewDirective;
	let elementRef: ElementRef<HTMLElement>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [{ provide: ElementRef, useValue: {} }],
		});
	});

	beforeEach(() => {
		global.IntersectionObserver ||= jest.fn();
		elementRef = TestBed.inject<ElementRef<HTMLElement>>(ElementRef);
	});

	it('should create an instance', () => {
		directive = new InViewDirective(elementRef);
		expect(directive).toBeTruthy();
	});

	it('should emit changes and set public property based on IntersectionObserver', () => {
		const callbackParams$ = new Subject<Array<IntersectionObserverEntry>>();
		jest.spyOn(global, 'IntersectionObserver').mockImplementation((callback) => {
			let callbacksCallsSub: Subscription;
			const observer = {
				observe: () =>
					(callbacksCallsSub = callbackParams$.pipe(tap((params) => callback(params, observer))).subscribe()),
				disconnect: () => callbacksCallsSub?.unsubscribe(),
			} as unknown as IntersectionObserver;
			return observer;
		});
		const inViewCallbackSpy = jest.fn((_isInView: boolean) => undefined);
		directive = new InViewDirective(elementRef);
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
