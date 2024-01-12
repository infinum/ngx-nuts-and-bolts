import { Customer } from '../../app/types/customer';

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
				},
				{
					id: 'walmart-elk',
					name: 'Elk Grove Store',
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
				},
				{
					id: 'amazon-lux',
					name: 'Luxembourg',
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
				},
				{
					id: 'target-cr-north',
					name: 'Cedar Rapids North',
				},
			],
		},
	]
): void {
	_customers.length = 0;

	_customers.push(...customers);
}
