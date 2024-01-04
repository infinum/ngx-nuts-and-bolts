import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICustomer } from '../types/customer';

@Injectable({ providedIn: 'root' })
export class CustomersService {
	private readonly apiUrl = '/customers';
	private readonly httpClient = inject(HttpClient);

	public getAllCustomers() {
		return this.httpClient.get<Array<ICustomer>>(this.apiUrl);
	}

	public getCustomerById(id: string) {
		return this.httpClient.get<ICustomer>(`${this.apiUrl}/${id}`);
	}
}
