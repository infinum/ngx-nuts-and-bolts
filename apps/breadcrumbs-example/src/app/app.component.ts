import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbsService } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { BreadcrumbTestBedData, BreadcrumbsComponent, NavigationPromptService } from 'breadcrumbs-testbed';
import { map } from 'rxjs';

@Component({
	standalone: true,
	imports: [CommonModule, RouterModule, BreadcrumbsComponent, FormsModule],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	private readonly router = inject(Router);
	protected readonly url$ = this.router.events.pipe(map(() => this.router.url));
	protected readonly navigationPromptService = inject(NavigationPromptService);
	private readonly breadcrumbsService = inject(BreadcrumbsService<BreadcrumbTestBedData>);

	protected readonly breadcrumbsForCodeSnippet$ = this.breadcrumbsService.breadcrumbs$.pipe(
		map((breadcrumbs) => {
			return breadcrumbs.map(({ data, url }) => {
				return {
					url,
					data,
				};
			});
		})
	);
}
