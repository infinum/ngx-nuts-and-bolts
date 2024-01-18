import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbsService } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { BreadcrumbData, CustomerLocationWithCustomerData } from '../../types/breadcrumb-data';

@Component({
	selector: 'app-breadcrumbs',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
	@Input() public topLevelLink?: { label: string; url: string };

	private readonly router = inject(Router);
	private readonly breadcrumbsService: BreadcrumbsService<BreadcrumbData> = inject(BreadcrumbsService);

	protected readonly breadcrumbs$ = this.breadcrumbsService.breadcrumbs$;

	protected isString(value: BreadcrumbData): value is string {
		return typeof value === 'string';
	}

	protected isCustomerLocationWithCustomerData(value: BreadcrumbData): value is CustomerLocationWithCustomerData {
		return value instanceof CustomerLocationWithCustomerData;
	}

	protected onLocationChange(e: Event, customerId: string): void {
		const newLocationId = (e.target as HTMLSelectElement).value;

		this.router.navigate(['/', 'customers', customerId, newLocationId]);
	}
}
