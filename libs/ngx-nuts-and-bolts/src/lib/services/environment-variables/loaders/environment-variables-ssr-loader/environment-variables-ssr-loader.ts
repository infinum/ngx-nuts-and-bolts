import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { PROCESS } from '../../../../injection-tokens/injection-tokens';
import { IEnvironmentVariablesLoader } from '../../environment-variables-loader.interface';
import { EnvironmentVariablesRecord } from '../../environment-variables-record.type';
import {
	environmentVariablesStateKey,
	ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG,
	IEnvironmentVariablesSSRLoaderConfig,
} from './environment-variables-ssr-loader-utils';

@Injectable()
export class EnvironmentVariablesSSRLoader<TVariable extends string> implements IEnvironmentVariablesLoader<TVariable> {
	constructor(
		@Inject(PLATFORM_ID) private readonly platformId: string,
		@Inject(ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG)
		private readonly config: IEnvironmentVariablesSSRLoaderConfig<TVariable>,
		private readonly transferState: TransferState,
		@Optional() @Inject(PROCESS) private readonly process?: NodeJS.Process
	) {}

	public load(): EnvironmentVariablesRecord<TVariable> | Observable<EnvironmentVariablesRecord<TVariable>> {
		if (isPlatformServer(this.platformId)) {
			if (!this.process) {
				throw new Error('Process is not defined, please provide it under the PROCESS injection token');
			}

			const variables: EnvironmentVariablesRecord<TVariable> = this.config.variablesToLoad.reduce(
				(record, variableToLoad) => {
					record[variableToLoad] = this.process?.env[variableToLoad];
					return record;
				},
				{} as EnvironmentVariablesRecord<TVariable>
			);
			this.transferState.set(environmentVariablesStateKey, variables);

			return variables;
		} else {
			return this.transferState.get(
				environmentVariablesStateKey,
				this.config.variablesToLoad.reduce((record, variableToLoad) => {
					record[variableToLoad] = undefined;
					return record;
				}, {} as EnvironmentVariablesRecord<TVariable>)
			);
		}
	}
}
