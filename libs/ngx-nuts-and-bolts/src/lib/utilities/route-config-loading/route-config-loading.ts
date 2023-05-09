import { NavigationError, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';

export function createRouteConfigLoadingObservable(router: Router): Observable<boolean> {
	return router.events.pipe(
		filter(
			(event) =>
				event instanceof RouteConfigLoadStart || event instanceof RouteConfigLoadEnd || event instanceof NavigationError
		),
		map((event) => event instanceof RouteConfigLoadStart)
	);
}
