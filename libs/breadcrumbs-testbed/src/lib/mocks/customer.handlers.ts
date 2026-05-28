import { HttpResponse, delay, http } from 'msw';
import { getMockCustomers } from './customers.mock-data';

function getAllCustomersHandlerFactory(apiUrl: string, withDelay = true) {
	return http.get(`${apiUrl}/customers`, async () => {
		if (withDelay) {
			await delay();
		}

		return HttpResponse.json(getMockCustomers());
	});
}

function getCustomerByIdHandlerFactory(apiUrl: string, withDelay = true) {
	return http.get(`${apiUrl}/customers/:id`, async (req) => {
		if (withDelay) {
			await delay();
		}

		const id = req.params['id'] as string;

		const customer = getMockCustomers().find((c) => c.id === id);

		if (customer) {
			return HttpResponse.json(customer);
		}

		return new HttpResponse(null, { status: 404, statusText: `Customer with id "${id}" not found` });
	});
}

export const customerHandlerFactories = [getAllCustomersHandlerFactory, getCustomerByIdHandlerFactory];
