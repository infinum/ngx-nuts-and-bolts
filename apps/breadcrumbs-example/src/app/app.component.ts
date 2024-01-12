import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbsService } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { Subscription, map } from 'rxjs';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbData } from './types/breadcrumb-data';

@Component({
	standalone: true,
	imports: [CommonModule, RouterModule, BreadcrumbsComponent],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
	private readonly router = inject(Router);
	public readonly url$ = this.router.events.pipe(map(() => this.router.url));
	private readonly breadcrumbsService: BreadcrumbsService<BreadcrumbData> = inject(BreadcrumbsService);

	protected readonly breadcrumbsForCodeSnippet$ = this.breadcrumbsService.breadcrumbs$.pipe(
		map((breadcrumbs) => {
			return breadcrumbs.map(({ extra, url, state }) => {
				return {
					url,
					urlFromState: state.url, // This is here just to demonstrate that it does not work correctly for deep links on initial page load
					extra,
				};
			});
		})
	);

	private readonly subscriptions = new Subscription();

	constructor() {
		this.subscriptions.add(
			this.breadcrumbsService.operationsQueue$.subscribe((operations) => {
				console.log('Operations queue', operations);
			})
		);
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
