import { Customer } from '../types';

const _customers: Array<Customer> = [];

export function getMockCustomers(): Array<Customer> {
	return _customers;
}

export function initMockCustomers(
	customers: Array<Customer> = [
		{
			id: 'walmart',
			name: 'Walmart',
			locations: [
				{
					id: 'walmart-sacramento',
					name: 'Sacramento Supercenter',
					address: '3661 Truxel Rd, Sacramento, CA 95834',
				},
				{
					id: 'walmart-elk',
					name: 'Elk Grove Store',
					address: '8465 Elk Grove Blvd, Elk Grove, CA 95758',
				},
			],
		},
		{
			id: 'amazon',
			name: 'Amazon',
			locations: [
				{
					id: 'amazon-hq',
					name: 'Headquarters',
					address: '410 Terry Ave. North, Seattle, WA 98109',
				},
			],
		},
		{
			id: 'target',
			name: 'Target',
			locations: [
				{
					id: 'target-cr-south',
					name: 'Cedar Rapids South',
					address: '3400 Edgewood Rd SW, Cedar Rapids, IA 52404',
				},
				{
					id: 'target-cr-north',
					name: 'Cedar Rapids North',
					address: '1030 Blairs Ferry Rd NE, Cedar Rapids, IA 52402',
				},
			],
		},
	]
): void {
	_customers.length = 0;

	_customers.push(...customers);
}
