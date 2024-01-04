import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BREADCRUMBS_RESOLVE_KEY } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { Customer } from '../../types/customer';

@Component({
	selector: 'app-customer-details',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './customer-details.component.html',
	styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent {
	@Input(BREADCRUMBS_RESOLVE_KEY) public customer!: Customer;
}
