import { InjectionToken } from '@angular/core';
import { makeStateKey } from '@angular/platform-browser';
import { EnvironmentVariablesRecord } from '@infinumjs/ngx-nuts-and-bolts';

export const PROCESS = new InjectionToken<NodeJS.Process>('PROCESS');

export const environmentVariablesStateKey = makeStateKey<EnvironmentVariablesRecord<string>>('environmentVariables');

export interface IEnvironmentVariablesSSRLoaderConfig<TVariable extends string> {
	variablesToLoad: Array<TVariable>;
}

export const ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG = new InjectionToken<IEnvironmentVariablesSSRLoaderConfig<string>>(
	'ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG'
);
