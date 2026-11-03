import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideEnvironmentVariables } from '@infinum/ngx-nuts-and-bolts/env';
import { EnvironmentVariable } from '@ngx-nuts-and-bolts/environment-variables-example-app-base';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	beforeEach(() => {
		jest.spyOn(console, 'log').mockImplementation(() => undefined);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [
				provideEnvironmentVariables({
					[EnvironmentVariable.Foo]: 'foo',
					[EnvironmentVariable.Bar]: 'bar',
				}),
				provideRouter([]),
			],
		}).compileComponents();
	});

	it('should create', () => {
		const fixture = TestBed.createComponent(AppComponent);
		expect(fixture.componentInstance).toBeTruthy();
	});
});
