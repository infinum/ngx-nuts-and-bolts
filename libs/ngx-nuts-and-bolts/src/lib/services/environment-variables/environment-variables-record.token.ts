import { InjectionToken } from '@angular/core';
import { EnvironmentVariablesRecord } from './environment-variables-record.type';

export const ENVIRONMENT_VARIABLES_RECORD = new InjectionToken<Partial<EnvironmentVariablesRecord<string>>>(
	'VARIABLES'
);
