import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbsService } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { CUSTOMERS_ROUTE_PATH } from './route-param';

@Component({
	standalone: true,
	imports: [CommonModule, RouterModule],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	protected readonly CUSTOMERS_ROUTE_PATH = CUSTOMERS_ROUTE_PATH;

	protected readonly bc$ = inject(BreadcrumbsService).breadcrumbs$;
}
