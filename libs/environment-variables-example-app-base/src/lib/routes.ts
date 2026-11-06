import { Route } from '@angular/router';

export const envExampleAppRoutes: Array<Route> = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'foo',
	},
	{
		path: 'foo',
		loadComponent: () => import('./pages/foo.page').then((m) => m.FooPageComponent),
	},
	{
		path: 'bar',
		loadComponent: () => import('./pages/bar.page').then((m) => m.BarPageComponent),
	},
];
