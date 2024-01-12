import { BreadcrumbResolver } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { BreadcrumbData, BreadcrumbRouteData } from '../types/breadcrumb-data';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Customer } from '../types/customer';
import { LOCATION_ID_ROUTE_PARAM } from '../route-param';

/**
 * @description This resolver is an example of a synchronous resolver that uses some data from the parent route's resolved data and returns breadcrumb info.
 */
export const locationDetailsBreadcrumbResolver: BreadcrumbResolver<BreadcrumbData, BreadcrumbRouteData> = (
	route: ActivatedRouteSnapshot
) => {
	const customer = route.parent?.data['customer'] as Customer | undefined | null;
	if (!customer) {
		throw new Error('Customer not found');
	}

	const location = customer.locations.find((location) => location.id === route.paramMap.get(LOCATION_ID_ROUTE_PARAM));
	if (!location) {
		throw new Error('Location not found');
	}

	return {
		breadcrumbData: { label: location.name },
		routeData: location,
	};
};
