import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbsService } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { BreadcrumbTestBedData, CustomerLocationWithCustomerData } from '../../types/breadcrumb-data';

@Component({
	selector: 'bea-breadcrumbs',
	imports: [CommonModule, RouterModule],
	templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
	@Input() public topLevelLink?: { label: string; url: string };

	private readonly router = inject(Router);
	private readonly breadcrumbsService = inject(BreadcrumbsService<BreadcrumbTestBedData>);

	protected readonly breadcrumbs$ = this.breadcrumbsService.breadcrumbs$;

	protected isString(value: BreadcrumbTestBedData): value is string {
		return typeof value === 'string';
	}

	protected isCustomerLocationWithCustomerData(
		value: BreadcrumbTestBedData
	): value is CustomerLocationWithCustomerData {
		return value instanceof CustomerLocationWithCustomerData;
	}

	protected onLocationChange(e: Event, customerId: string) {
		const newLocationId = (e.target as HTMLSelectElement).value;

		return this.router.navigate(['/', 'customers', customerId, newLocationId]);
	}
}
