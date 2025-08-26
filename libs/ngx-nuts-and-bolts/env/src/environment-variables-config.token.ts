import { InjectionToken } from '@angular/core';
import { EnvironmentVariablesConfig } from './environment-variables-config.type';

export const ENVIRONMENT_VARIABLES_CONFIG = new InjectionToken<EnvironmentVariablesConfig>(
	'ENVIRONMENT_VARIABLES_CONFIG'
);
