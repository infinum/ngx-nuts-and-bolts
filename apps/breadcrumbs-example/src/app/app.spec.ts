import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideConsole, provideWindow } from '@infinum/ngx-nuts-and-bolts';
import { provideBreadcrumbsConfig } from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { BreadcrumbTestBedData, NavigationPromptService } from '@ngx-nuts-and-bolts/breadcrumbs-testbed';
import { AppComponent } from './app.component';

class NavigationPromptServiceStub {
	public shouldPrompt = false;
}

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [
				provideWindow(window),
				provideConsole(console),
				provideBreadcrumbsConfig<BreadcrumbTestBedData>({ logLevel: 'silent' }),
				provideRouter([]),
				provideHttpClient(),
				{ provide: NavigationPromptService, useClass: NavigationPromptServiceStub },
			],
		}).compileComponents();
	});

	it('should create', () => {
		const fixture = TestBed.createComponent(AppComponent);
		expect(fixture.componentInstance).toBeTruthy();
	});
});
