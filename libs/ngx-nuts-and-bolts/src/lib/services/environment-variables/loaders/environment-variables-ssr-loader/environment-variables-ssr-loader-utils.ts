import { InjectionToken } from '@angular/core';
import { makeStateKey } from '@angular/platform-browser';
import { EnvironmentVariablesRecord } from '../../environment-variables-record.type';

export const environmentVariablesStateKey = makeStateKey<EnvironmentVariablesRecord<string>>('environmentVariables');

export interface IEnvironmentVariablesSSRLoaderConfig<TVariable extends string> {
	variablesToLoad: Array<TVariable>;
}

export const ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG = new InjectionToken<IEnvironmentVariablesSSRLoaderConfig<string>>(
	'ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG'
);
