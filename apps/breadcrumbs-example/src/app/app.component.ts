import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbsService } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { map } from 'rxjs';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbData } from './types/breadcrumb-data';

@Component({
	standalone: true,
	imports: [CommonModule, RouterModule, BreadcrumbsComponent],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
}
