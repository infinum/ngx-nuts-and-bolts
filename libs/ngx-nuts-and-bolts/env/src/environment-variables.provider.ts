import { StaticProvider } from '@angular/core';
import { ENVIRONMENT_VARIABLES_RECORD } from './environment-variables-record.token';
import { EnvironmentVariablesRecord } from './environment-variables-record.type';

export function provideEnvironmentVariables<TVariable extends string>(
	env: EnvironmentVariablesRecord<TVariable>
): StaticProvider {
	return {
		provide: ENVIRONMENT_VARIABLES_RECORD,
		useValue: env,
	};
}
