import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
	BreadcrumbsConfig,
	BreadcrumbsService,
	provideBreadcrumbsConfig,
} from '@infinum/ngx-nuts-and-bolts/breadcrumbs';
import { provideNoopConsole, provideTestingTitleService } from '@infinum/ngx-nuts-and-bolts/testing-utils';
import { breadcrumbsTestBedRoutes } from '../routes';
import { BreadcrumbTestBedData } from '../types/breadcrumb-data';

describe('BreadcrumbsService', () => {
	let service: BreadcrumbsService<BreadcrumbTestBedData>;

	describe('with default config', () => {
		beforeEach(() => {
			init();
		});

		it('should create a service instance', () => {
			expect(service).toBeTruthy();
		});
	});

	function init(config?: BreadcrumbsConfig<BreadcrumbTestBedData>) {
		TestBed.configureTestingModule({
			providers: [
				provideTestingTitleService(),
				provideNoopConsole(),
				provideBreadcrumbsConfig(config),
				RouterTestingModule.withRoutes(breadcrumbsTestBedRoutes),
			],
		});

		service = TestBed.inject(BreadcrumbsService);
	}
});
