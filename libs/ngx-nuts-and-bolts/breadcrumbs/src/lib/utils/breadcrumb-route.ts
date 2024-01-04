import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CanDeactivateFn, ResolveFn, Route } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { BREADCRUMBS_CONFIG } from '../providers';
import { BreadcrumbsService } from '../services';
import { TitleConfiguration } from '../types';

export const BREADCRUMBS_RESOLVE_KEY = 'breadcrumbs';

function updateTitle<T>(
	titleConfiguration: TitleConfiguration<T>,
	breadcrumbsService: BreadcrumbsService<T>,
	title: Title
) {
	if (!titleConfiguration.formatter) {
		return;
	}

	title.setTitle(titleConfiguration.formatter(breadcrumbsService.breadcrumbs));
}

export function breadcrumbRoute<TBreadcrumbData>(
	route: Route & { breadcrumbResolver: ResolveFn<TBreadcrumbData> }
): Route {
	const resolve = route.resolve || {};
	const canDeactivate = (route.canDeactivate || []) as Array<CanDeactivateFn<unknown>>;

	canDeactivate.push(() => {
		const breadcrumbsService = inject(BreadcrumbsService);
		const title = inject(Title);
		const breadcrumbsConfig = inject(BREADCRUMBS_CONFIG);

		breadcrumbsService.pop();
		updateTitle(breadcrumbsConfig.titleConfiguration, breadcrumbsService, title);
		return true;
	});

	resolve[BREADCRUMBS_RESOLVE_KEY] = (...args: Parameters<ResolveFn<TBreadcrumbData>>) => {
		const breadcrumbsService = inject(BreadcrumbsService);
		const title = inject(Title);
		const breadcrumbsConfig = inject(BREADCRUMBS_CONFIG);

		// eslint-disable-next-line rxjs/finnish
		const resolver = route.breadcrumbResolver(...args);

		if (resolver instanceof Observable) {
			return resolver.pipe(
				tap((result) => {
					breadcrumbsService.push(result);
					updateTitle(breadcrumbsConfig.titleConfiguration, breadcrumbsService, title);
				}),
				map(() => true)
			);
		} else if (resolver instanceof Promise) {
			return resolver.then((result) => {
				breadcrumbsService.push(result);
				updateTitle(breadcrumbsConfig.titleConfiguration, breadcrumbsService, title);
				return true;
			});
		}

		breadcrumbsService.push(resolver);
		updateTitle(breadcrumbsConfig.titleConfiguration, breadcrumbsService, title);
		return true;
	};

	return {
		...route,
		resolve,
		canDeactivate,
	};
}
