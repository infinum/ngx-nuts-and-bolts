import { Inject, Injectable } from '@angular/core';
import { EnvironmentVariablesRecord } from '../..';
import { IEnvironmentVariablesLoader } from '../../environment-variables-loader.interface';
import {
	ENVIRONMENT_VARIABLES_STATIC_LOADER_CONFIG,
	IEnvironmentVariablesStaticLoaderConfig,
} from './environment-variables-static-loader-utils';

@Injectable()
export class EnvironmentVariablesStaticLoader<TVariable extends string>
	implements IEnvironmentVariablesLoader<TVariable>
{
	constructor(
		@Inject(ENVIRONMENT_VARIABLES_STATIC_LOADER_CONFIG)
		private readonly config: IEnvironmentVariablesStaticLoaderConfig<TVariable>
	) {}

	public load(): EnvironmentVariablesRecord<TVariable> {
		return this.config.environmentVariablesRecord;
	}
}
