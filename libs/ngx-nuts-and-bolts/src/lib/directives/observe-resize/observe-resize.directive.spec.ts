import { NgZone } from '@angular/core';
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ObserveResizeDirective } from './observe-resize.directive';

describe('ObserveResizeDirective', () => {
	let directive: ObserveResizeDirective;
	let elementRef: ElementRef;
	let ngZone: NgZone;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			providers: [{ provide: ElementRef, useValue: {} }],
		}).compileComponents();
	});

	beforeEach(() => {
		global.ResizeObserver ||= jest.fn();
		elementRef = TestBed.inject(ElementRef);
		ngZone = TestBed.inject(NgZone);
	});

	it('should mirror rectangle height into output based on ResizeObserver', async () => {
		const callbackParams$ = new Subject<Array<ResizeObserverEntry>>();
		jest.spyOn(global, 'ResizeObserver').mockImplementation((callback) => {
			let callbackCallsSub: Subscription;
			const observer = {
				observe: () =>
					(callbackCallsSub = callbackParams$.pipe(tap((params) => callback(params, observer))).subscribe()),
				disconnect: () => callbackCallsSub?.unsubscribe(),
				unobserve: noop,
			};
			return observer;
		});
		const observeResizeCallbackSpy = jest.fn();
		directive = new ObserveResizeDirective(elementRef, ngZone);
		directive.ngAfterViewInit();
		const sub = directive.event.subscribe(observeResizeCallbackSpy);

		const resizeEntry1 = {} as ResizeObserverEntry;
		callbackParams$.next([resizeEntry1]);

		expect(observeResizeCallbackSpy).toHaveBeenCalledTimes(1);
		expect(observeResizeCallbackSpy.mock.calls[0][0]).toStrictEqual(resizeEntry1);

		const resizeEntry2 = {} as ResizeObserverEntry;
		callbackParams$.next([resizeEntry2]);

		expect(observeResizeCallbackSpy).toHaveBeenCalledTimes(2);
		expect(observeResizeCallbackSpy.mock.calls[0][0]).toStrictEqual(resizeEntry2);

		const resizeEntry3 = {} as ResizeObserverEntry;
		callbackParams$.next([resizeEntry3]);

		expect(observeResizeCallbackSpy).toHaveBeenCalledTimes(3);
		expect(observeResizeCallbackSpy.mock.calls[0][0]).toStrictEqual(resizeEntry3);

		sub.unsubscribe();
	});
});
