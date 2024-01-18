import { Route } from '@angular/router';
import { breadcrumbRoute, breadcrumbStringResolver } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { customerDetailsBreadcrumbResolver } from './breadcrumb-resolvers/customer-details.breadcrumb-resolver';
import { locationDetailsBreadcrumbResolver } from './breadcrumb-resolvers/location-details.breadcrumb-resolver';
import { confirmEntryGuard } from './guards/confirm-entry.guard';
import { confirmLeaveGuard } from './guards/confirm-leave.guard';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CUSTOMERS_ROUTE_PATH, CUSTOMER_ID_ROUTE_PARAM, LOCATION_ID_ROUTE_PARAM } from './route-param';

export const appRoutes: Array<Route> = [
	// Homepage
	{
		path: '',
		component: HomepageComponent,
	},

	// Customers
	breadcrumbRoute({
		path: CUSTOMERS_ROUTE_PATH,
		breadcrumbResolver: breadcrumbStringResolver('Customers'),
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
				breadcrumbBoundary: true,
				canActivate: [confirmEntryGuard],
				canDeactivate: [confirmLeaveGuard],
				loadComponent: () =>
					import('./pages/customer-details/customer-details.component').then((m) => m.CustomerDetailsComponent),
				children: [
					breadcrumbRoute({
						path: `:${LOCATION_ID_ROUTE_PARAM}`,
						breadcrumbResolver: locationDetailsBreadcrumbResolver,
						canActivate: [confirmEntryGuard],
						canDeactivate: [confirmLeaveGuard],
						breadcrumbResolverKey: 'location',
						loadComponent: () =>
							import('./pages/location-details/location-details.component').then((m) => m.LocationDetailsComponent),
					}),
				],
			}),
		],
	}),

	// FAQ
	breadcrumbRoute({
		path: 'faq',
		breadcrumbResolver: breadcrumbStringResolver('FAQ'),
		loadComponent: () => import('./pages/faq/faq.component').then((m) => m.FaqComponent),
	}),
];
