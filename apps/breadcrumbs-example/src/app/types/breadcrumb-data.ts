import { Customer } from './customer';
import { CustomerLocation } from './customer-location';

export class CustomerLocationWithCustomerData {
	constructor(public readonly location: CustomerLocation, public readonly customer: Customer) {}
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type BreadcrumbData = string | CustomerLocationWithCustomerData;
export type BreadcrumbRouteData = string | Customer | CustomerLocation;
