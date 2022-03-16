import { FactoryProvider, ModuleWithProviders, ValueProvider } from '@angular/core';
import { ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG, PROCESS } from './environment-variables-ssr-loader-utils';
import { EnvironmentVariablesSSRLoaderModule } from './environment-variables-ssr-loader.module';

describe('Environment variables SSR laoder module', () => {
	let resolvedModule: ModuleWithProviders<EnvironmentVariablesSSRLoaderModule>;

	it('should add process provider to the providers array by default', () => {
		resolvedModule = EnvironmentVariablesSSRLoaderModule.forRoot({
			variablesToLoad: [],
		});

		const processProvider = resolvedModule.providers?.find(
			(provider) => (provider as FactoryProvider).provide === PROCESS
		);

		expect(processProvider).toBeTruthy();
	});

	it('should add process provider to the providers array if the option is set to true', () => {
		resolvedModule = EnvironmentVariablesSSRLoaderModule.forRoot({
			provideProcess: true,
			variablesToLoad: [],
		});

		const processProvider = resolvedModule.providers?.find(
			(provider) => (provider as FactoryProvider).provide === PROCESS
		);

		expect(processProvider).toBeTruthy();
	});

	it('should not add process provider to the providers array if the option is set to false', () => {
		resolvedModule = EnvironmentVariablesSSRLoaderModule.forRoot({
			provideProcess: false,
			variablesToLoad: [],
		});

		const processProvider = resolvedModule.providers?.find(
			(provider) => (provider as FactoryProvider).provide === PROCESS
		);

		expect(processProvider).toBeFalsy();
	});

	it('should set the provider for the list of variables to be loaded', () => {
		resolvedModule = EnvironmentVariablesSSRLoaderModule.forRoot({
			variablesToLoad: ['foo', 'bar'],
		});

		const configProvider = resolvedModule.providers?.find(
			(provider) => (provider as ValueProvider).provide === ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG
		) as ValueProvider;

		expect(configProvider.useValue.variablesToLoad).toEqual(['foo', 'bar']);
	});
});
