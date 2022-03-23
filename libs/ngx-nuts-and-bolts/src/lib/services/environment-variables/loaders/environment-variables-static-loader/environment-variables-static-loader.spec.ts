import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ENVIRONMENT_VARIABLES_LOADER } from '../../environment-variables-loader.interface';
import { EnvironmentVariablesRecord } from '../../environment-variables-record.type';
import { EnvironmentVariablesModule } from '../../environment-variables.module';
import { EnvironmentVariablesService } from '../../environment-variables.service';
import { EnvironmentVariablesStaticLoader } from './environment-variables-static-loader';
import { ENVIRONMENT_VARIABLES_STATIC_LOADER_CONFIG } from './environment-variables-static-loader-utils';
import { EnvironmentVariablesStaticLoaderModule } from './environment-variables-static-loader.module';

enum EnvironmentVariable {
	FOO = 'foo',
	BAR = 'bar',
}

// WINDOW injection token
const WINDOW = new InjectionToken<Window>('window');

// Extend window with env property
// eslint-disable-next-line @typescript-eslint/naming-convention
interface Window {
	env: EnvironmentVariablesRecord<EnvironmentVariable>;
}

fdescribe('Environment variables static loader', () => {
	let loader: EnvironmentVariablesStaticLoader<EnvironmentVariable>;

	describe('with config set via withConfig', () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				imports: [
					EnvironmentVariablesModule,
					EnvironmentVariablesStaticLoaderModule.withConfig({
						environmentVariablesRecord: {
							[EnvironmentVariable.FOO]: 'I am Foo',
							[EnvironmentVariable.BAR]: 'I am Bar',
						},
					}),
				],
			});

			loader = TestBed.inject(
				ENVIRONMENT_VARIABLES_LOADER
			) as unknown as EnvironmentVariablesStaticLoader<EnvironmentVariable>;
		});

		it('should be created', () => {
			expect(loader).toBeTruthy();
		});

		it('should load variable values that were passed to the module', () => {
			const result = loader.load();
			expect(result).toEqual({
				[EnvironmentVariable.FOO]: 'I am Foo',
				[EnvironmentVariable.BAR]: 'I am Bar',
			});
		});

		it('should integrate with environment variables service', () => {
			const env = TestBed.inject(EnvironmentVariablesService);
			expect(env.get(EnvironmentVariable.FOO)).toEqual('I am Foo');
		});
	});

	describe('with custom config provider', () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				imports: [EnvironmentVariablesModule, EnvironmentVariablesStaticLoaderModule],
				providers: [
					{
						provide: ENVIRONMENT_VARIABLES_STATIC_LOADER_CONFIG,
						useFactory: (window: Window) => {
							return {
								environmentVariablesRecord: window.env,
							};
						},
						deps: [WINDOW],
					},
					{
						provide: WINDOW,
						useValue: {
							env: {
								[EnvironmentVariable.FOO]: 'I am Foo',
								[EnvironmentVariable.BAR]: 'I am Bar',
							},
						},
					},
				],
			});

			loader = TestBed.inject(
				ENVIRONMENT_VARIABLES_LOADER
			) as unknown as EnvironmentVariablesStaticLoader<EnvironmentVariable>;
		});

		it('should be created', () => {
			expect(loader).toBeTruthy();
		});

		it('should load variable values that were passed to the module', () => {
			const result = loader.load();
			expect(result).toEqual({
				[EnvironmentVariable.FOO]: 'I am Foo',
				[EnvironmentVariable.BAR]: 'I am Bar',
			});
		});

		it('should integrate with environment variables service', () => {
			const env = TestBed.inject(EnvironmentVariablesService);
			expect(env.get(EnvironmentVariable.FOO)).toEqual('I am Foo');
		});
	});
});
