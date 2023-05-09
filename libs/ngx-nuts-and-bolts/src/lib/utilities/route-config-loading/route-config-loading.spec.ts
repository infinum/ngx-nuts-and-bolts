import {
	NavigationEnd,
	NavigationStart,
	RouteConfigLoadEnd,
	RouteConfigLoadStart,
	Router,
	RouterEvent,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { createRouteConfigLoadingObservable } from './route-config-loading';

class RouterMock {
	// eslint-disable-next-line rxjs/no-exposed-subjects, rxjs/finnish
	public readonly events = new Subject<RouterEvent>();
}

describe('createRouteConfigLoadingObservable', () => {
	let router: RouterMock;
	let isRouteConfigLoading$: Observable<boolean>;

	beforeEach(() => {
		router = new RouterMock();
		isRouteConfigLoading$ = createRouteConfigLoadingObservable(router as unknown as Router);
	});

	it('should emit true/false as RouteConfigLoadStart/RouteConfigLoadEnd events come in', () => {
		const callbacks = mockSubscribeCallbacks();
		isRouteConfigLoading$.subscribe(callbacks);

		expect(callbacks.next).toHaveBeenCalledTimes(0);
		expect(callbacks.error).toHaveBeenCalledTimes(0);
		expect(callbacks.complete).toHaveBeenCalledTimes(0);

		router.events.next(new RouteConfigLoadStart({}) as unknown as RouterEvent);

		expect(callbacks.next).toHaveBeenCalledTimes(1);
		expect(callbacks.next).toHaveBeenNthCalledWith(1, true);
		expect(callbacks.error).toHaveBeenCalledTimes(0);
		expect(callbacks.complete).toHaveBeenCalledTimes(0);

		router.events.next(new RouteConfigLoadEnd({}) as unknown as RouterEvent);

		expect(callbacks.next).toHaveBeenCalledTimes(2);
		expect(callbacks.next).toHaveBeenNthCalledWith(2, false);
		expect(callbacks.error).toHaveBeenCalledTimes(0);
		expect(callbacks.complete).toHaveBeenCalledTimes(0);
	});

	it('should ignore other events, such as NavigationStart and NavigationEnd', () => {
		const callbacks = mockSubscribeCallbacks();
		isRouteConfigLoading$.subscribe(callbacks);

		expect(callbacks.next).toHaveBeenCalledTimes(0);
		expect(callbacks.error).toHaveBeenCalledTimes(0);
		expect(callbacks.complete).toHaveBeenCalledTimes(0);

		// TODO: test all other events
		router.events.next(new NavigationStart(0, 'foo'));
		router.events.next(new NavigationEnd(0, 'foo', 'foo'));

		expect(callbacks.next).toHaveBeenCalledTimes(0);
		expect(callbacks.error).toHaveBeenCalledTimes(0);
		expect(callbacks.complete).toHaveBeenCalledTimes(0);
	});
});

function mockSubscribeCallbacks() {
	return { next: jest.fn(), complete: jest.fn(), error: jest.fn() };
}
