import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { BreadcrumbResolver } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { map } from 'rxjs';
import { CUSTOMER_ID_ROUTE_PARAM } from '../route-param';
import { CustomersService } from '../services/customers.service';

export const customerDetailsBreadcrumbResolver: BreadcrumbResolver<string> = (route: ActivatedRouteSnapshot) => {
	const customersService = inject(CustomersService);

	const customerId = route.paramMap.get(CUSTOMER_ID_ROUTE_PARAM);
	if (!customerId) {
		return 'Customer not found';
	}

	return customersService.getCustomerById(customerId).pipe(map((customer) => customer.name));
};
