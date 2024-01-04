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

	return customersService.getCustomerById(customerId);
};
