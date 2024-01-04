import { setupWorker } from 'msw/browser';
import { initMockCustomers } from './data/customers.mock-data';
import { customerHandlerFactories } from './handlers/customer.handlers';

export function startMsw(apiUrl = '') {
	initMockCustomers();

	const handlers = [...customerHandlerFactories].map((factory) => factory(apiUrl));

	const worker = setupWorker(...handlers);

	return worker.start();
}
