import { FactoryProvider, ModuleWithProviders, ValueProvider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';
import { ENVIRONMENT_VARIABLES_LOADER } from '@infinumjs/ngx-nuts-and-bolts';
import { ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG, PROCESS } from './environment-variables-ssr-loader-utils';
import { EnvironmentVariablesSSRLoaderModule } from './environment-variables-ssr-loader.module';
import { TransferStateTestingService } from './transfer-state.testing.service';

describe('Environment variables SSR laoder module', () => {
	let resolvedModule: ModuleWithProviders<EnvironmentVariablesSSRLoaderModule>;

	it('should add process provider to the providers array by default', () => {
		resolvedModule = EnvironmentVariablesSSRLoaderModule.withConfig({
			variablesToLoad: [],
		});

		const processProvider = resolvedModule.providers?.find(
			(provider) => (provider as FactoryProvider).provide === PROCESS
		);

		expect(processProvider).toBeTruthy();
	});

	it('should add process provider to the providers array if the option is set to true', () => {
		resolvedModule = EnvironmentVariablesSSRLoaderModule.withConfig({
			provideProcess: true,
			variablesToLoad: [],
		});

		const processProvider = resolvedModule.providers?.find(
			(provider) => (provider as FactoryProvider).provide === PROCESS
		);

		expect(processProvider).toBeTruthy();
	});

	it('should not add process provider to the providers array if the option is set to false', () => {
		resolvedModule = EnvironmentVariablesSSRLoaderModule.withConfig({
			provideProcess: false,
			variablesToLoad: [],
		});

		const processProvider = resolvedModule.providers?.find(
			(provider) => (provider as FactoryProvider).provide === PROCESS
		);

		expect(processProvider).toBeFalsy();
	});

	it('should set the provider for the list of variables to be loaded', () => {
		resolvedModule = EnvironmentVariablesSSRLoaderModule.withConfig({
			variablesToLoad: ['foo', 'bar'],
		});

		const configProvider = resolvedModule.providers?.find(
			(provider) => (provider as ValueProvider).provide === ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG
		) as ValueProvider;

		expect(configProvider.useValue.variablesToLoad).toEqual(['foo', 'bar']);
	});

	it('should provide EnvironmentVariablesSSRLoader', () => {
		TestBed.configureTestingModule({
			imports: [EnvironmentVariablesSSRLoaderModule],
			providers: [
				{
					provide: ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG,
					useValue: {
						variablesToLoad: ['foo', 'bar'],
					},
				},
				{
					provide: TransferState,
					useClass: TransferStateTestingService,
				},
			],
		});

		const loader = TestBed.inject(ENVIRONMENT_VARIABLES_LOADER);
		expect(loader).toBeTruthy();
	});
});
