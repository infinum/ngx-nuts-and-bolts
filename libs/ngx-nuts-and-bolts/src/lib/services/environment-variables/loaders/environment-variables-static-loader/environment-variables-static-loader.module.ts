import { ModuleWithProviders, NgModule } from '@angular/core';
import { EnvironmentVariablesStaticLoader } from './environment-variables-static-loader';
import {
	ENVIRONMENT_VARIABLES_STATIC_LOADER_CONFIG,
	IEnvironmentVariablesStaticLoaderConfig,
} from './environment-variables-static-loader-utils';

@NgModule()
export class EnvironmentVariablesStaticLoaderModule {
	public static forRoot<TVariable extends string>(
		config: IEnvironmentVariablesStaticLoaderConfig<TVariable>
	): ModuleWithProviders<EnvironmentVariablesStaticLoaderModule> {
		return {
			ngModule: EnvironmentVariablesStaticLoaderModule,
			providers: [
				EnvironmentVariablesStaticLoader,
				{
					provide: ENVIRONMENT_VARIABLES_STATIC_LOADER_CONFIG,
					useValue: config,
				},
			],
		};
	}
}
