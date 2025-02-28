import { Customer } from './customer';
import { CustomerLocation } from './customer-location';

export class CustomerLocationWithCustomerData {
	constructor(public readonly location: CustomerLocation, public readonly customer: Customer) {}
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type BreadcrumbTestBedData = string | CustomerLocationWithCustomerData;
export type BreadcrumbTestBedRouteData = string | Customer | CustomerLocation;
