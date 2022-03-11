import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentVariablesRecord } from './environment-variables-record.type';

export const ENVIRONMENT_VARIABLES_LOADER = new InjectionToken('ENVIRONMENT_VARIABLES_LOADER');

export interface IEnvironmentVariablesLoader<TVariable extends string> {
	load(): EnvironmentVariablesRecord<TVariable> | Observable<EnvironmentVariablesRecord<TVariable>>;
}
