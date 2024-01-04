import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { CUSTOMER_ID_ROUTE_PARAM } from '../route-param';
import { CustomersService } from '../services/customers.service';
import { BreadcrumbData } from '../types/breadcrumb-data';

export const customerDetailsBreadcrumbResolver: ResolveFn<BreadcrumbData> = (route: ActivatedRouteSnapshot) => {
	const customersService = inject(CustomersService);

	const customerId = route.paramMap.get(CUSTOMER_ID_ROUTE_PARAM);
	if (!customerId) {
		return 'Customer not found';
	}

	// If the component that gets loaded on this route also fetches the customer data, you will have 2 identical API calls.
	// This should be solved/optimized in application codebase, most probably by using a data store or some other method
	// of deduping of API calls.
	return customersService.getCustomerById(customerId);
};
