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

// This is a higher-level "integration" test suite for multiple aspects of the breadcrumbs feature.
// This file is placed in libs/breadcrumbs-testbed to avoid circular dependency linting issues. Although the circular dep is only between lib and .spec files, Nx's enforce boundaries rule has no way to ignore .spec files.

describe('Breadcrumbs', () => {
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
			imports: [RouterTestingModule.withRoutes(breadcrumbsTestBedRoutes)],
			providers: [provideTestingTitleService(), provideNoopConsole(), provideBreadcrumbsConfig(config)],
		});

		service = TestBed.inject(BreadcrumbsService);
	}
});
