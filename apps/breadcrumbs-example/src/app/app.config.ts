import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideConsole, provideWindow } from '@infinum/ngx-nuts-and-bolts';
import { provideBreadcrumbsConfig } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { BreadcrumbTestBedData } from 'breadcrumbs-testbed';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideWindow(window),
		provideConsole(console),
		provideBreadcrumbsConfig<BreadcrumbTestBedData>({
			logLevel: 'debug',
			titleConfiguration: {
				formatter: (breadcrumbs) => {
					return [
						'My logistics company™',
						...breadcrumbs.map((breadcrumb) => {
							if (typeof breadcrumb.data === 'string') {
								return breadcrumb.data;
							}

							return breadcrumb.data.location.name;
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
