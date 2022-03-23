import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { ENVIRONMENT_VARIABLES_LOADER } from '../../environment-variables-loader.interface';
import { EnvironmentVariablesStaticLoader } from './environment-variables-static-loader';
import {
	ENVIRONMENT_VARIABLES_STATIC_LOADER_CONFIG,
	IEnvironmentVariablesStaticLoaderConfig,
} from './environment-variables-static-loader-utils';

@NgModule({
	providers: [
		{
			provide: ENVIRONMENT_VARIABLES_LOADER,
			useClass: EnvironmentVariablesStaticLoader,
		},
	],
})
export class EnvironmentVariablesStaticLoaderModule {
	public static withConfig<TVariable extends string>(
		config: IEnvironmentVariablesStaticLoaderConfig<TVariable>
	): ModuleWithProviders<EnvironmentVariablesStaticLoaderModule> {
		const providers: Array<Provider> = [
			{
				provide: ENVIRONMENT_VARIABLES_STATIC_LOADER_CONFIG,
				useValue: config,
			},
		];

		return {
			ngModule: EnvironmentVariablesStaticLoaderModule,
			providers,
		};
	}
}
