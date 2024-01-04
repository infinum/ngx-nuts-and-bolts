import { ICustomer } from '../../app/types/customer';

const _customers: Array<ICustomer> = [];

export function getMockCustomers(): Array<ICustomer> {
	return _customers;
}

export function initMockCustomers(
	customers: Array<ICustomer> = [
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
