import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivateFn, ResolveFn, Route, RouterStateSnapshot } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { BreadcrumbsService } from '../services';
import { BreadcrumbResolver } from '../types';

export const BREADCRUMBS_DEFAULT_RESOLVE_KEY = 'breadcrumbs';

export type BreadcrumbRoute<TBreadcrumbData, TRouteData = TBreadcrumbData> = Route & {
	breadcrumbResolver: BreadcrumbResolver<TBreadcrumbData, TRouteData>;
	breadcrumbResolverKey?: string;
	breadcrumbBoundary?: boolean;
};

export function breadcrumbRoute<TBreadcrumbData, TRouteData = TBreadcrumbData>(
	routeConfig: BreadcrumbRoute<TBreadcrumbData, TRouteData>
): Route {
	const {
		breadcrumbResolver,
		breadcrumbResolverKey = BREADCRUMBS_DEFAULT_RESOLVE_KEY,
		breadcrumbBoundary = false,
		providers = [],
		...originalRouteConfig
	} = routeConfig;

	if (breadcrumbBoundary) {
		providers.push(BreadcrumbsService);
	}

	const breadcrumbRouteDeactivationGuard: CanDeactivateFn<unknown> = () => {
		const breadcrumbsService = inject(BreadcrumbsService<TBreadcrumbData>);

		breadcrumbsService.pop();
		return true;
	};
	const canDeactivate = originalRouteConfig.canDeactivate || [];
	canDeactivate.push(breadcrumbRouteDeactivationGuard);

	const breadcrumbRouteResolver: ResolveFn<TRouteData | undefined> = (
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	) => {
		const breadcrumbsService = inject(BreadcrumbsService<TBreadcrumbData>);
		const url = route.pathFromRoot.map((r) => r.url.map((s) => s.toString()).join('/')).join('/');

		// eslint-disable-next-line rxjs/finnish
		const resolver = breadcrumbResolver(route, state);

		if (resolver instanceof Observable) {
			return resolver.pipe(
				tap((result) => {
					breadcrumbsService.push({
						url,
						route,
						state,
						data: result.breadcrumbData,
					});
				}),
				map(({ routeData }) => routeData)
			);
		} else if (resolver instanceof Promise) {
			return resolver.then((result) => {
				breadcrumbsService.push({
					url,
					route,
					state,
					data: result.breadcrumbData,
				});
				return result.routeData;
			});
		} else {
			breadcrumbsService.push({
				url,
				route,
				state,
				data: resolver.breadcrumbData,
			});
			return resolver.routeData;
		}
	};
	const resolve = originalRouteConfig.resolve || {};
	resolve[breadcrumbResolverKey] = breadcrumbRouteResolver;

	return {
		...originalRouteConfig,
		providers,
		resolve,
		canDeactivate,
	};
}
