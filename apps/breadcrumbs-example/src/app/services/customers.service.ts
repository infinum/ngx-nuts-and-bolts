import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Customer } from '../types/customer';

@Injectable({ providedIn: 'root' })
export class CustomersService {
	private readonly apiUrl = '/customers';
	private readonly httpClient = inject(HttpClient);

	public getAllCustomers() {
		return this.httpClient.get<Array<Customer>>(this.apiUrl);
	}

	public getCustomerById(id: string) {
		return this.httpClient.get<Customer>(`${this.apiUrl}/${id}`);
	}
}
