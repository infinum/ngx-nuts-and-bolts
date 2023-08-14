import { Provider } from '@angular/core';
import { IEnvironmentVariablesConfig } from './environment-variables-config.interface';
import { ENVIRONMENT_VARIABLES_CONFIG } from './environment-variables-config.token';

export function provideEnvironmentVariablesServiceConfig(config: IEnvironmentVariablesConfig): Provider {
	return {
		provide: ENVIRONMENT_VARIABLES_CONFIG,
		useValue: config,
	};
}
