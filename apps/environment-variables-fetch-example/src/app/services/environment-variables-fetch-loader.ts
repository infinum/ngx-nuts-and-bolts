/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentVariablesRecord, IEnvironmentVariablesLoader } from '@infinumjs/ngx-nuts-and-bolts';
import { Observable } from 'rxjs';
import { EnvironmentVariable } from '../../../../environment-variables-ssr-example/src/app/enums/environment-variable.enum';

@Injectable()
export class EnvironmentVariablesFetchLoader implements IEnvironmentVariablesLoader<EnvironmentVariable> {
	constructor(private readonly http: HttpClient) {}

	public load(): Observable<EnvironmentVariablesRecord<EnvironmentVariable>> {
		return this.http.get<EnvironmentVariablesRecord<EnvironmentVariable>>('./assets/env.json');
	}
}
