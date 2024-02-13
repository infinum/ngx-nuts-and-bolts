import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomersService } from '../../services/customers.service';

@Component({
	selector: 'bea-customers',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
	protected readonly customers$ = inject(CustomersService).getAllCustomers();
}
