import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
	BreadcrumbsConfig,
	BreadcrumbsService,
	provideBreadcrumbsConfig,
} from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { provideNoopConsole, provideTestingTitleService } from '@infinum/ngx-nuts-and-bolts/testing-utils';
import { setupServer } from 'msw/node';
import { BreadcrumbsComponent } from '../components/breadcrumbs/breadcrumbs.component';
import { customerHandlerFactories, initMockCustomers } from '../mocks';
import { breadcrumbsTestBedRoutes } from '../routes';
import { BreadcrumbTestBedData } from '../types/breadcrumb-data';
import { provideHttpClient } from '@angular/common/http';
import { lastValueFrom, timer } from 'rxjs';

// This is a higher-level "integration" test suite for multiple aspects of the breadcrumbs feature.
// This file is placed in libs/breadcrumbs-testbed to avoid circular dependency linting issues. Although the circular dep is only between lib and .spec files, Nx's enforce boundaries rule has no way to ignore .spec files.

@Component({
	template: `
		<bea-breadcrumbs [topLevelLink]="{ label: 'My logistics company™', url: '/' }"></bea-breadcrumbs>
		<router-outlet></router-outlet>
	`,
})
class HostComponent {}

describe('Breadcrumbs', () => {
	let service: BreadcrumbsService<BreadcrumbTestBedData>;
	let fixture: ComponentFixture<HostComponent>;
	let component: HostComponent;
	let router: Router;

	describe('with default config', () => {
		beforeEach(() => {
			init();
		});

		it('should create the host component', () => {
			expect(component).toBeTruthy();
		});

		it('should create a service instance', () => {
			expect(service).toBeTruthy();
		});

		it('should render the homepage on /', async () => {
			await navigate('/');
			const homepage = fixture.debugElement.query(By.css('bea-homepage'));

			expect(homepage).toBeTruthy();
		});

		it('should render the breadcrumbs on /', async () => {
			await navigate('/');

			const breadcrumbs = fixture.debugElement.query(By.css('bea-breadcrumbs'));

			expect(breadcrumbs).toBeTruthy();

			const breadcrumbsElement = breadcrumbs.nativeElement as HTMLElement;
			expect(breadcrumbsElement.textContent).toBe('My logistics company™');
		});

		it('should render the breadcrumbs on /faq', async () => {
			await navigate('/faq');

			const breadcrumbs = fixture.debugElement.query(By.css('bea-breadcrumbs'));

			expect(breadcrumbs).toBeTruthy();

			const breadcrumbsElement = breadcrumbs.nativeElement as HTMLElement;
			expect(breadcrumbsElement.textContent).toBe('My logistics company™>FAQ');
		});

		it('should render the breadcrumbs on /customers', async () => {
			await navigate('/customers');

			const breadcrumbs = fixture.debugElement.query(By.css('bea-breadcrumbs'));

			expect(breadcrumbs).toBeTruthy();

			const breadcrumbsElement = breadcrumbs.nativeElement as HTMLElement;
			expect(breadcrumbsElement.textContent).toBe('My logistics company™>Customers');
		});

		it('should navigate to a specific customer and re-render the breadcrumbs', async () => {
			await navigate('/customers');

			const amazonLink = fixture.debugElement.query(By.css('table a[href="/customers/amazon"]'))
				.nativeElement as HTMLAnchorElement;

			amazonLink.click();

			await fixture.whenStable();
			fixture.detectChanges();

			const breadcrumbs = fixture.debugElement.query(By.css('bea-breadcrumbs'));
			const breadcrumbsElement = breadcrumbs.nativeElement as HTMLElement;
			expect(breadcrumbsElement.textContent).toBe('My logistics company™>Customers');
		});

		it('should render the breadcrumbs on /customers/walmart', async () => {
			await navigate('/customers/walmart');

			const breadcrumbs = fixture.debugElement.query(By.css('bea-breadcrumbs'));

			expect(breadcrumbs).toBeTruthy();

			const breadcrumbsElement = breadcrumbs.nativeElement as HTMLElement;
			expect(breadcrumbsElement.textContent).toBe('My logistics company™>Customers>Walmart');
		});

		it('should render the breadcrumbs on /customers/amazon', async () => {
			await navigate('/customers/amazon');

			const breadcrumbs = fixture.debugElement.query(By.css('bea-breadcrumbs'));

			expect(breadcrumbs).toBeTruthy();

			const breadcrumbsElement = breadcrumbs.nativeElement as HTMLElement;
			expect(breadcrumbsElement.textContent).toBe('My logistics company™>Customers>Amazon');
		});

		it('should navigate and re-render breadcrumbs when clicking "Customers" link from breadcrumbs', async () => {
			await navigate('/customers/amazon');

			const breadcrumbs = fixture.debugElement.query(By.css('bea-breadcrumbs'));

			let breadcrumbsElement = breadcrumbs.nativeElement as HTMLElement;
			expect(breadcrumbsElement.textContent).toBe('My logistics company™>Customers>Amazon');

			const customersLink = breadcrumbs.queryAll(By.css('a'))[1].nativeElement as HTMLAnchorElement;

			customersLink.click();

			await fixture.whenStable();
			fixture.detectChanges();

			breadcrumbsElement = breadcrumbs.nativeElement as HTMLElement;
			expect(breadcrumbsElement.textContent).toBe('My logistics company™>Customers');
		});
	});

	async function navigate(url: string) {
		await router.navigateByUrl(url);

		fixture.detectChanges();

		await fixture.whenStable();
		await lastValueFrom(timer(0)); // not 100% sure why this is necessary
		fixture.detectChanges();
	}

	async function init(config?: BreadcrumbsConfig<BreadcrumbTestBedData>) {
		startMsw();

		TestBed.configureTestingModule({
			declarations: [HostComponent],
			imports: [RouterTestingModule.withRoutes(breadcrumbsTestBedRoutes), BreadcrumbsComponent],
			providers: [
				provideTestingTitleService(),
				provideNoopConsole(),
				provideBreadcrumbsConfig(config),
				provideHttpClient(),
			],
		});

		service = TestBed.inject(BreadcrumbsService);
		router = TestBed.inject(Router);

		fixture = TestBed.createComponent(HostComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}

	function startMsw(apiUrl = '') {
		initMockCustomers();

		const handlers = [...customerHandlerFactories].map((factory) => factory(apiUrl));

		const server = setupServer(...handlers);

		return server.listen({ onUnhandledRequest: 'bypass' });
	}

	startMsw();
});
