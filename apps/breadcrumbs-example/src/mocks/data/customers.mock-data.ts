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
		},
		{
			id: 'amazon',
			name: 'Amazon',
		},
		{
			id: 'target',
			name: 'Target',
		},
	]
): void {
	_customers.length = 0;

	_customers.push(...customers);
}
