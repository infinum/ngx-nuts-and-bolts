import { InjectionToken } from '@angular/core';
import { EnvironmentVariablesRecord } from '../../environment-variables-record.type';

export interface IEnvironmentVariablesStaticLoaderConfig<TVariable extends string> {
	environmentVariablesRecord: EnvironmentVariablesRecord<TVariable>;
}

export const ENVIRONMENT_VARIABLES_STATIC_LOADER_CONFIG = new InjectionToken<
	IEnvironmentVariablesStaticLoaderConfig<string>
>('ENVIRONMENT_VARIABLES_STATIC_LOADER_CONFIG');
