import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Breadcrumb<T> = {
	url: string;
	route: ActivatedRouteSnapshot;
	/**
	 * @deprecated Marked as deprecated to indicate that you should not use `state.url` for URL resolution.
	 * Use `url` property instead, as that will resolve deep links correctly on non-sequential navigation and on initial page load.
	 */
	state: RouterStateSnapshot;
	extra: T;
};
