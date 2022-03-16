/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentVariablesRecord, IEnvironmentVariablesLoader } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariable } from '@ngx-nuts-and-bolts/environment-variables-example-app-base';
import { Observable } from 'rxjs';

@Injectable()
export class EnvironmentVariablesFetchLoader implements IEnvironmentVariablesLoader<EnvironmentVariable> {
	constructor(private readonly http: HttpClient) {}

	public load(): Observable<EnvironmentVariablesRecord<EnvironmentVariable>> {
		return this.http.get<EnvironmentVariablesRecord<EnvironmentVariable>>('./assets/env.json');
	}
}
