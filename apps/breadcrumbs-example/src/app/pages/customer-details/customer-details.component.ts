import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Customer } from '../../types/customer';

@Component({
	selector: 'app-customer-details',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './customer-details.component.html',
	styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent {
	@Input() public customer!: Customer;
}
