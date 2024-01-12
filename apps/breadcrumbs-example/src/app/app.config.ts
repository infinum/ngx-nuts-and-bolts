import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideConsole, provideWindow } from '@infinum/ngx-nuts-and-bolts';
import { provideBreadcrumbsConfig } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { appRoutes } from './app.routes';
import { BreadcrumbData } from './types/breadcrumb-data';

export const appConfig: ApplicationConfig = {
	providers: [
		provideWindow(window),
		provideConsole(console),
		provideBreadcrumbsConfig<BreadcrumbData>({
			logLevel: 'debug',
			titleConfiguration: {
				formatter: (breadcrumbs) => {
					return [
						'My logistics company™',
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
