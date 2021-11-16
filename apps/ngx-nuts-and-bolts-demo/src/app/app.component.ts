import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { fadeAnimation } from './animations/fade.animation';
import { scaleAnimation } from './animations/scale.animation';
import { AppRoutePath } from './app-route-path.enum';

@Component({
	selector: 'inf-ngx-nuts-and-bolts-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [scaleAnimation(), fadeAnimation()],
})
export class AppComponent implements OnDestroy {
	@ViewChild('sidenav', { static: true }) public sidenav!: MatSidenav;

	public readonly mobileQuery: MediaQueryList;
	public readonly isMobileInitially: boolean;
	private readonly mobileQueryListener: () => void;
	public readonly AppRoutePath = AppRoutePath;

	constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');

		this.mobileQueryListener = () => {
			this.updateSidebarState();

			changeDetectorRef.detectChanges();
		};
		this.mobileQuery.addEventListener('change', this.mobileQueryListener);

		this.isMobileInitially = this.mobileQuery.matches;
	}

	public ngOnDestroy(): void {
		this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
	}

	private updateSidebarState(): void {
		if (this.mobileQuery.matches) {
			this.sidenav.close();
		} else {
			this.sidenav.open();
		}
	}
}
