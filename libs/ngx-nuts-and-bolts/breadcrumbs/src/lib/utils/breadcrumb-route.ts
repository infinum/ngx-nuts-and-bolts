import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, CanDeactivateFn, ResolveFn, Route, RouterStateSnapshot } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { BREADCRUMBS_CONFIG } from '../providers';
import { BreadcrumbsService } from '../services';
import { BreadcrumbResolver, TitleConfiguration } from '../types';

export const BREADCRUMBS_RESOLVE_KEY = 'breadcrumbs';

function updateTitle<T>(
	titleConfiguration: TitleConfiguration<T> | null,
	breadcrumbsService: BreadcrumbsService<T>,
	title: Title
) {
	if (!titleConfiguration) {
		return;
	}

	title.setTitle(titleConfiguration.formatter(breadcrumbsService.breadcrumbs));
}

export type BreadcrumbRoute<TBreadcrumbData, TRouteData = TBreadcrumbData> = Route & {
	breadcrumbResolver: BreadcrumbResolver<TBreadcrumbData, TRouteData>;
};

export function breadcrumbRoute<TBreadcrumbData, TRouteData = TBreadcrumbData>(
	routeConfig: BreadcrumbRoute<TBreadcrumbData, TRouteData>
): Route {
	const { breadcrumbResolver, ...originalRouteConfig } = routeConfig;

	const breadcrumbRouteDeactivationGuard: CanDeactivateFn<unknown> = () => {
		const breadcrumbsService: BreadcrumbsService<TBreadcrumbData> = inject(BreadcrumbsService);
		const title = inject(Title);
		const breadcrumbsConfig = inject(BREADCRUMBS_CONFIG);

		breadcrumbsService.pop();
		updateTitle(breadcrumbsConfig.titleConfiguration, breadcrumbsService, title);
		return true;
	};
	const canDeactivate = originalRouteConfig.canDeactivate || [];
	canDeactivate.push(breadcrumbRouteDeactivationGuard);

	const breadcrumbRouteResolver: ResolveFn<TRouteData | undefined> = (
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	) => {
		const breadcrumbsService: BreadcrumbsService<TBreadcrumbData> = inject(BreadcrumbsService);
		const title = inject(Title);
		const breadcrumbsConfig = inject(BREADCRUMBS_CONFIG);
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
						extra: result.breadcrumbData,
					});
					updateTitle(breadcrumbsConfig.titleConfiguration, breadcrumbsService, title);
				}),
				map(({ routeData }) => routeData)
			);
		} else if (resolver instanceof Promise) {
			return resolver.then((result) => {
				breadcrumbsService.push({
					url,
					route,
					state,
					extra: result.breadcrumbData,
				});
				updateTitle(breadcrumbsConfig.titleConfiguration, breadcrumbsService, title);
				return result.routeData;
			});
		} else {
			breadcrumbsService.push({
				url,
				route,
				state,
				extra: resolver.breadcrumbData,
			});
			updateTitle(breadcrumbsConfig.titleConfiguration, breadcrumbsService, title);
			return resolver.routeData;
		}
	};
	const resolve = originalRouteConfig.resolve || {};
	resolve[BREADCRUMBS_RESOLVE_KEY] = breadcrumbRouteResolver;

	return {
		...originalRouteConfig,
		resolve,
		canDeactivate,
	};
}
