import { Customer } from './customer';
import { CustomerLocation } from './customer-location';

export class CustomerLocationWithCustomerData {
	constructor(public readonly location: CustomerLocation, public readonly customer: Customer) {}
}

export type BreadcrumbTestBedData = string | CustomerLocationWithCustomerData;
export type BreadcrumbTestBedRouteData = string | Customer | CustomerLocation;
