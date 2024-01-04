import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CUSTOMER_ID_ROUTE_PARAM } from '../../route-param';
import { EMPTY, Observable } from 'rxjs';
import { ICustomer } from '../../types/customer';
import { CustomersService } from '../../services/customers.service';

@Component({
	selector: 'app-customer-details',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './customer-details.component.html',
	styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnChanges {
	@Input(CUSTOMER_ID_ROUTE_PARAM) public customerId!: string;

	private readonly customersService = inject(CustomersService);
	protected customer$: Observable<ICustomer> = EMPTY;

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['customerId']) {
			this.customer$ = this.customersService.getCustomerById(this.customerId);
		}
	}
}
