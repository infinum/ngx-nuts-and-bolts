import { CustomerLocation } from './customer-location';

export type Customer = {
	id: string;
	name: string;
	locations: Array<CustomerLocation>;
};
