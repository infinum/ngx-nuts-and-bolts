import { TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { attachUnsupportedMatchMediaMethods } from '../testing/media-matcher.testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	beforeAll(() => {
		attachUnsupportedMatchMediaMethods();
	});

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule,
				RouterTestingModule,
				MatSidenavModule,
				MatListModule,
				MatToolbarModule,
				MatButtonModule,
				MatIconModule,
			],
			declarations: [AppComponent],
		}).compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
