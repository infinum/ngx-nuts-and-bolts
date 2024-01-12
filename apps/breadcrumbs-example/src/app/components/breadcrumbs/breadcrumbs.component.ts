import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbsService } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { BreadcrumbData } from '../../types/breadcrumb-data';

@Component({
	selector: 'app-breadcrumbs',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
	@Input() public topLevelLink?: { label: string; url: string };

	private readonly breadcrumbsService: BreadcrumbsService<BreadcrumbData> = inject(BreadcrumbsService);

	protected readonly breadcrumbs$ = this.breadcrumbsService.breadcrumbs$;
}
