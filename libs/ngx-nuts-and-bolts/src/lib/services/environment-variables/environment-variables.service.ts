import { Injectable } from '@angular/core';
import { EnvironmentVariablesRecord } from './environment-variables-record.type';

@Injectable()
export class EnvironmentVariablesService<TVariable extends string> {
	private variables?: EnvironmentVariablesRecord<TVariable>;

	public init(variables: EnvironmentVariablesRecord<TVariable>): void {
		this.variables = variables;
	}

	public get(variableName: TVariable): string | undefined {
		if (!this.variables) {
			console.warn(new Error('Environment variables are not initialized.'));
		}

		return this.variables?.[variableName];
	}
}
