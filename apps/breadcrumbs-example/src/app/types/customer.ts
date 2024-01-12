import { CustomerLocation } from './customer-location';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Customer = {
	id: string;
	name: string;
	locations: Array<CustomerLocation>;
};
