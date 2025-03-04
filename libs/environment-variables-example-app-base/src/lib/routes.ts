import { Route } from '@angular/router';

export const envExampleAppRoutes: Array<Route> = [
	{
		path: 'foo',
		loadChildren: () => import('./pages/foo.page').then((m) => m.FooPageModule),
	},
	{
		path: 'bar',
		loadChildren: () => import('./pages/bar.page').then((m) => m.BarPageModule),
	},
];
