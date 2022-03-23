import { APP_INITIALIZER } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { asyncScheduler, combineLatest, from, Observable, of } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { ENVIRONMENT_VARIABLES_LOADER } from './environment-variables-loader.interface';
import { EnvironmentVariablesModule } from './environment-variables.module';
import { EnvironmentVariablesService } from './environment-variables.service';

enum EnvironmentVariable {
	FOO = 'FOO',
	BAR = 'BAR',
}

describe('EnvironmentVariablesModule + initializer', () => {
	let service: EnvironmentVariablesService<EnvironmentVariable>;

	describe('with synchronous loader', () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				imports: [EnvironmentVariablesModule],
				providers: [
					{
						provide: ENVIRONMENT_VARIABLES_LOADER,
						useValue: {
							load: () => ({
								[EnvironmentVariable.FOO]: 'foo',
								[EnvironmentVariable.BAR]: 'bar',
							}),
						},
					},
				],
			});

			service = TestBed.inject(EnvironmentVariablesService);
		});

		it('should provice and initialize the service', () => {
			expect(service).toBeTruthy();

			expect(service.get(EnvironmentVariable.FOO)).toBe('foo');
		});
	});

	describe('with asynchronous loader', () => {
		beforeEach(async () => {
			TestBed.configureTestingModule({
				imports: [EnvironmentVariablesModule],
				providers: [
					{
						provide: ENVIRONMENT_VARIABLES_LOADER,
						useValue: {
							load: () =>
								of({
									[EnvironmentVariable.FOO]: 'foo',
									[EnvironmentVariable.BAR]: 'bar',
								}).pipe(observeOn(asyncScheduler)),
						},
					},
				],
			});

			service = TestBed.inject(EnvironmentVariablesService);

			await triggerAppInitializers();
		});

		it('should provice and initialize the service', () => {
			expect(service).toBeTruthy();

			expect(service.get(EnvironmentVariable.FOO)).toBe('foo');
		});
	});

	function triggerAppInitializers(): Promise<unknown> {
		const appInitializers = TestBed.inject(APP_INITIALIZER);
		const awaitFor = appInitializers
			.map((initializer) => {
				// eslint-disable-next-line rxjs/finnish
				const result = initializer();

				if (result instanceof Promise) {
					return from(result);
				}

				return result;
			})
			.filter(Boolean) as Array<Observable<unknown>>;

		return combineLatest(awaitFor).toPromise();
	}
});
