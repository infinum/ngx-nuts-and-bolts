/* istanbul ignore file */

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ENVIRONMENT_VARIABLES_LOADER } from './environment-variables-loader.interface';
import { environmentVariablesInitializer } from './environment-variables.initializer';
import { EnvironmentVariablesService } from './environment-variables.service';

@NgModule({
	providers: [
		EnvironmentVariablesService,
		{
			provide: APP_INITIALIZER,
			multi: true,
			useFactory: environmentVariablesInitializer,
			deps: [EnvironmentVariablesService, ENVIRONMENT_VARIABLES_LOADER],
		},
	],
})
export class EnvironmentVariablesModule {}
