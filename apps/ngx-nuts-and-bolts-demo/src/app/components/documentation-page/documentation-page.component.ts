import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, HostBinding, OnDestroy } from '@angular/core';

@Component({
	selector: 'inf-documentation-page',
	templateUrl: './documentation-page.component.html',
	styleUrls: ['./documentation-page.component.scss'],
})
export class DocumentationPageComponent implements OnDestroy {
	public readonly mobileQuery: MediaQueryList;
	private readonly mobileQueryListener: () => void;

	@HostBinding('class.is-mobile')
	public get padding(): boolean {
		return this.mobileQuery.matches;
	}

	constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');

		this.mobileQueryListener = () => {
			changeDetectorRef.detectChanges();
		};
		this.mobileQuery.addEventListener('change', this.mobileQueryListener);
	}

	public ngOnDestroy(): void {
		this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
	}
}
