import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Route } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { BreadcrumbsService } from '../services/breadcrumbs.service';
import { Title } from '@angular/platform-browser';

export type BreadcrumbResolver<T> = (...args: Parameters<CanActivateFn>) => T | Observable<T> | Promise<T>;
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TitleConfiguration<T> = {
	updateTitle: true;
	formatter: (breadcrumbs: Array<T>) => string;
};

function updateTitle<T>(
	titleConfiguration: TitleConfiguration<T>,
	breadcrumbsService: BreadcrumbsService<T>,
	title: Title
) {
	title.setTitle(titleConfiguration.formatter(breadcrumbsService.breadcrumbs));
}

export function breadcrumbRoute<TBreadcrumbData>(
	route: Route & { breadcrumbResolver: BreadcrumbResolver<TBreadcrumbData> },
	titleConfiguration: TitleConfiguration<TBreadcrumbData> = {
		updateTitle: true,
		formatter: (breadcrumbs) => breadcrumbs.join(' | '),
	}
): Route {
	const data = route.data || {};
	const canActivate = (route.canActivate || []) as Array<CanActivateFn>;
	const canDeactivate = (route.canDeactivate || []) as Array<CanDeactivateFn<unknown>>;

	canDeactivate.push(() => {
		const breadcrumbsService = inject(BreadcrumbsService);
		const title = inject(Title);

		breadcrumbsService.pop();
		updateTitle(titleConfiguration, breadcrumbsService, title);
		return true;
	});

	canActivate.push((...args) => {
		const breadcrumbsService = inject(BreadcrumbsService);
		const title = inject(Title);

		// eslint-disable-next-line rxjs/finnish
		const resolver = route.breadcrumbResolver(...args);

		if (resolver instanceof Observable) {
			return resolver.pipe(
				tap((result) => {
					breadcrumbsService.push(result);
					updateTitle(titleConfiguration, breadcrumbsService, title);
				}),
				map(() => true)
			);
		} else if (resolver instanceof Promise) {
			return resolver.then((result) => {
				breadcrumbsService.push(result);
				updateTitle(titleConfiguration, breadcrumbsService, title);
				return true;
			});
		}

		breadcrumbsService.push(resolver);
		updateTitle(titleConfiguration, breadcrumbsService, title);
		return true;
	});

	return {
		...route,
		data,
		canActivate,
		canDeactivate,
	};
}
