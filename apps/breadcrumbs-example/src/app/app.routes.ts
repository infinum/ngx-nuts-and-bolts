import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { breadcrumbRoute } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { map } from 'rxjs';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CUSTOMERS_ROUTE_PATH, CUSTOMER_ID_ROUTE_PARAM } from './route-param';
import { CustomersService } from './services/customers.service';

export const appRoutes: Array<Route> = [
	breadcrumbRoute({
		path: '',
		breadcrumbResolver: () => 'Home',
		component: HomepageComponent,
	}),
	breadcrumbRoute({
		path: CUSTOMERS_ROUTE_PATH,
		breadcrumbResolver: () => 'Customers',
		children: [
			breadcrumbRoute({
				path: '',
				breadcrumbResolver: () => 'Index',
				loadComponent: () => import('./pages/customers/customers.component').then((m) => m.CustomersComponent),
			}),
			breadcrumbRoute({
				path: `:${CUSTOMER_ID_ROUTE_PARAM}`,
				breadcrumbResolver: (route: ActivatedRouteSnapshot) => {
					const customersService = inject(CustomersService);

					const customerId = route.paramMap.get(CUSTOMER_ID_ROUTE_PARAM);
					if (!customerId) {
						return 'Customer not found';
					}

					return customersService.getCustomerById(customerId).pipe(map((customer) => customer.name));
				},
				loadComponent: () =>
					import('./pages/customer-details/customer-details.component').then((m) => m.CustomerDetailsComponent),
			}),
		],
	}),
];
