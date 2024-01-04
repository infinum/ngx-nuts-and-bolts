import { Route } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CUSTOMERS_ROUTE_PATH, CUSTOMER_ID_ROUTE_PARAM } from './route-param';

export const appRoutes: Array<Route> = [
	{
		path: '',
		component: HomepageComponent,
	},
	{
		path: CUSTOMERS_ROUTE_PATH,
		loadComponent: () => import('./pages/customers/customers.component').then((m) => m.CustomersComponent),
	},
	{
		path: `${CUSTOMERS_ROUTE_PATH}/:${CUSTOMER_ID_ROUTE_PARAM}`,
		loadComponent: () =>
			import('./pages/customer-details/customer-details.component').then((m) => m.CustomerDetailsComponent),
	},
];
