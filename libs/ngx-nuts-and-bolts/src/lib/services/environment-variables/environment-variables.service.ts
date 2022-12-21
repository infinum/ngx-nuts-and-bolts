import { Inject, Injectable } from '@angular/core';
import { EnvironmentVariablesRecord, ENVIRONMENT_VARIABLES_RECORD } from './environment-variables-record.type';

@Injectable()
export class EnvironmentVariablesService<TVariable extends string> {
	constructor(@Inject(ENVIRONMENT_VARIABLES_RECORD) private readonly variables: EnvironmentVariablesRecord<TVariable>) {
		console.log(variables);
	}

	public get(variableName: TVariable): string | undefined {
		return this.variables[variableName];
	}
}
