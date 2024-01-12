import { Route } from '@angular/router';
import { breadcrumbLiteralResolver, breadcrumbRoute } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { customerDetailsBreadcrumbResolver } from './breadcrumb-resolvers/customer-details.breadcrumb-resolver';
import { confirmEntryGuard } from './guards/confirm-entry.guard';
import { confirmLeaveGuard } from './guards/confirm-leave.guard';
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
		canActivate: [confirmEntryGuard],
		canDeactivate: [confirmLeaveGuard],
		children: [
			{
				path: '',
				loadComponent: () => import('./pages/customers/customers.component').then((m) => m.CustomersComponent),
			},
			breadcrumbRoute({
				path: `:${CUSTOMER_ID_ROUTE_PARAM}`,
				breadcrumbResolver: customerDetailsBreadcrumbResolver,
				breadcrumbResolverKey: 'customer',
				canActivate: [confirmEntryGuard],
				canDeactivate: [confirmLeaveGuard],
				loadComponent: () =>
					import('./pages/customer-details/customer-details.component').then((m) => m.CustomerDetailsComponent),
			}),
		],
	}),
	breadcrumbRoute({
		path: 'faq',
		breadcrumbResolver: breadcrumbLiteralResolver({ label: 'FAQ' }),
		loadComponent: () => import('./pages/faq/faq.component').then((m) => m.FaqComponent),
	}),
];
