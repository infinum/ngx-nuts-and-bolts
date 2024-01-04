import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbResolver } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { map } from 'rxjs';
import { CUSTOMER_ID_ROUTE_PARAM } from '../route-param';
import { CustomersService } from '../services/customers.service';
import { BreadcrumbData, BreadcrumbRouteData } from '../types/breadcrumb-data';

export const customerDetailsBreadcrumbResolver: BreadcrumbResolver<BreadcrumbRouteData, BreadcrumbData> = (
	route: ActivatedRouteSnapshot
) => {
	const customersService = inject(CustomersService);

	const customerId = route.paramMap.get(CUSTOMER_ID_ROUTE_PARAM);
	if (!customerId) {
		throw new Error('Customer ID is missing');
	}

	return customersService.getCustomerById(customerId).pipe(
		map((customer) => {
			return {
				breadcrumbData: { label: customer.name },
				routeData: customer,
			};
		})
	);
};
