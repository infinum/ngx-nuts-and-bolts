import { isPlatformServer } from '@angular/common';
import { ModuleWithProviders, NgModule, PLATFORM_ID, Provider } from '@angular/core';
import { ENVIRONMENT_VARIABLES_LOADER } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariablesSSRLoader } from './environment-variables-ssr-loader';
import { ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG, PROCESS } from './environment-variables-ssr-loader-utils';

export interface IEnvironmentVariablesSSRLoaderModuleConfig<TVariable extends string> {
	provideProcess?: boolean;
	variablesToLoad?: Array<TVariable>;
}

@NgModule()
export class EnvironmentVariablesSSRLoaderModule {
	public static forRoot<TVariable extends string>(
		config?: IEnvironmentVariablesSSRLoaderModuleConfig<TVariable>
	): ModuleWithProviders<EnvironmentVariablesSSRLoaderModule> {
		const providers: Array<Provider> = [
			{
				provide: ENVIRONMENT_VARIABLES_LOADER,
				useClass: EnvironmentVariablesSSRLoader,
			},
		];

		const provideProcess = config?.provideProcess ?? true;
		if (provideProcess) {
			providers.push({
				provide: PROCESS,
				useFactory: (platformId: string) => {
					if (isPlatformServer(platformId)) {
						return process;
					}

					return undefined;
				},
				deps: [PLATFORM_ID],
			});
		}

		if (config?.variablesToLoad) {
			providers.push({
				provide: ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG,
				useValue: {
					variablesToLoad: config.variablesToLoad,
				},
			});
		}

		return {
			ngModule: EnvironmentVariablesSSRLoaderModule,
			providers,
		};
	}
}
