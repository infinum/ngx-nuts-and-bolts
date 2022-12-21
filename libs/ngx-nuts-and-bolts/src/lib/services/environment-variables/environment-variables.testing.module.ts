import { ModuleWithProviders, NgModule } from '@angular/core';
import { EnvironmentVariablesRecord, ENVIRONMENT_VARIABLES_RECORD } from './environment-variables-record.type';
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
					provide: ENVIRONMENT_VARIABLES_RECORD,
					useValue: variables,
				},
			],
		};
	}
}
