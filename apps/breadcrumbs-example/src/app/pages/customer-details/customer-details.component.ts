import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { Customer } from '../../types/customer';

@Component({
	selector: 'app-customer-details',
	standalone: true,
	imports: [CommonModule, RouterModule, BreadcrumbsComponent],
	templateUrl: './customer-details.component.html',
	styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent {
	@Input() public customer!: Customer;
}
