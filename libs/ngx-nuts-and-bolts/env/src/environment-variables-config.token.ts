import { InjectionToken } from '@angular/core';
import { IEnvironmentVariablesConfig } from './environment-variables-config.interface';

export const ENVIRONMENT_VARIABLES_CONFIG = new InjectionToken<IEnvironmentVariablesConfig>(
	'ENVIRONMENT_VARIABLES_CONFIG'
);
