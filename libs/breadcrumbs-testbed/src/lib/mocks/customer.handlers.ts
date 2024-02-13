import { HttpResponse, delay, http } from 'msw';
import { getMockCustomers } from './customers.mock-data';

function getAllCustomersHandlerFactory(apiUrl: string) {
	return http.get(`${apiUrl}/customers`, async () => {
		await delay();

		return HttpResponse.json(getMockCustomers());
	});
}

function getCustomerByIdHandlerFactory(apiUrl: string) {
	return http.get(`${apiUrl}/customers/:id`, async (req) => {
		await delay();

		const { id } = req.params;

		const customer = getMockCustomers().find((c) => c.id === id);

		if (customer) {
			return HttpResponse.json(customer);
		}

		return new HttpResponse(null, { status: 404, statusText: `Customer with id "${id}" not found` });
	});
}

export const customerHandlerFactories = [getAllCustomersHandlerFactory, getCustomerByIdHandlerFactory];
