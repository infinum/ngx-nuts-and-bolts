import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideBreadcrumbsConfig } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { appRoutes } from './app.routes';
import { BreadcrumbData } from './types/breadcrumb-data';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBreadcrumbsConfig<BreadcrumbData>({
			titleConfiguration: {
				formatter: (breadcrumbs) => {
					return [
						'Breadcrumbs example app',
						...breadcrumbs.map((breadcrumb) => {
							return breadcrumb.extra.label;
						}),
					]
						.reverse()
						.join(' | ');
				},
			},
		}),
		provideRouter(appRoutes, withEnabledBlockingInitialNavigation(), withComponentInputBinding()),
		provideHttpClient(),
	],
};
