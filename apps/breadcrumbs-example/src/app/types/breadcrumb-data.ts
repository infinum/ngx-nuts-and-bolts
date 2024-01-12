import { Customer } from './customer';
import { CustomerLocation } from './customer-location';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type BreadcrumbData = { label: string };
export type BreadcrumbRouteData = string | Customer | CustomerLocation;
