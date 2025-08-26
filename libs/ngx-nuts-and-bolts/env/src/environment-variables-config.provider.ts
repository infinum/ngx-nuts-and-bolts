import { Provider } from '@angular/core';
import { EnvironmentVariablesConfig } from './environment-variables-config.type';
import { ENVIRONMENT_VARIABLES_CONFIG } from './environment-variables-config.token';

export function provideEnvironmentVariablesServiceConfig(config: EnvironmentVariablesConfig): Provider {
	return {
		provide: ENVIRONMENT_VARIABLES_CONFIG,
		useValue: config,
	};
}
