import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ENVIRONMENT_VARIABLES_LOADER, IEnvironmentVariablesLoader } from './environment-variables-loader.interface';
import { EnvironmentVariablesRecord } from './environment-variables-record.type';
import { EnvironmentVariablesService } from './environment-variables.service';

@NgModule()
export class EnvironmentVariablesTestingModule {
	public static withMockEnvironment<TVariable extends string>(
		variables: EnvironmentVariablesRecord<TVariable>
	): ModuleWithProviders<EnvironmentVariablesTestingModule> {
		return {
			ngModule: EnvironmentVariablesTestingModule,
			providers: [
				EnvironmentVariablesService,
				{
					provide: ENVIRONMENT_VARIABLES_LOADER,
					useValue: {
						load: () => variables,
					},
				},
				{
					provide: APP_INITIALIZER,
					multi: true,
					useFactory: (env: EnvironmentVariablesService<TVariable>, loader: IEnvironmentVariablesLoader<TVariable>) => {
						env.init(loader.load() as EnvironmentVariablesRecord<TVariable>);
						return () => Promise.resolve();
					},
					deps: [EnvironmentVariablesService, ENVIRONMENT_VARIABLES_LOADER],
				},
			],
		};
	}
}
