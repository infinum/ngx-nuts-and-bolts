import { Route } from '@angular/router';
import { breadcrumbRoute, breadcrumbLiteralResolver } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { customerDetailsBreadcrumbResolver } from './breadcrumb-resolvers/customer-details.breadcrumb-resolver';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CUSTOMERS_ROUTE_PATH, CUSTOMER_ID_ROUTE_PARAM } from './route-param';

export const appRoutes: Array<Route> = [
	{
		path: '',
		component: HomepageComponent,
	},
	breadcrumbRoute({
		path: CUSTOMERS_ROUTE_PATH,
		breadcrumbResolver: breadcrumbLiteralResolver({ label: 'Customers' }),
		children: [
			{
				path: '',
				loadComponent: () => import('./pages/customers/customers.component').then((m) => m.CustomersComponent),
			},
			breadcrumbRoute({
				path: `:${CUSTOMER_ID_ROUTE_PARAM}`,
				breadcrumbResolver: customerDetailsBreadcrumbResolver,
				loadComponent: () =>
					import('./pages/customer-details/customer-details.component').then((m) => m.CustomerDetailsComponent),
			}),
		],
	}),
];
