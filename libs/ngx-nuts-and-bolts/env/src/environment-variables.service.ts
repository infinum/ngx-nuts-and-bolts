import { Injectable, inject } from '@angular/core';
import { IEnvironmentVariablesConfig } from './environment-variables-config.interface';
import { ENVIRONMENT_VARIABLES_CONFIG } from './environment-variables-config.token';
import { ENVIRONMENT_VARIABLES_RECORD } from './environment-variables-record.token';
import { EnvironmentVariablesRecord } from './environment-variables-record.type';

const DEFAULT_TRUTHY_BOOLEAN_STRINGS = ['true', '1'];

@Injectable({ providedIn: 'root' })
export class EnvironmentVariablesService<TVariable extends string> {
	private readonly variables = inject(ENVIRONMENT_VARIABLES_RECORD);
	private readonly config = inject(ENVIRONMENT_VARIABLES_CONFIG, { optional: true });
	private readonly truthyBooleanStrings = this.config?.truthyBooleanStrings ?? DEFAULT_TRUTHY_BOOLEAN_STRINGS;

	public get(variableName: TVariable): string | undefined {
		return this.variables[variableName];
	}

	public getAsNumber(variableName: TVariable): number | undefined {
		const value = this.get(variableName);
		return value === undefined ? undefined : Number(value);
	}

	/**
	 * @description Transforms the of an environment variable into a boolean. Configurable via IEnvironmentVariablesConfig->truthyBooleanStrings. Before comparison, the actual value is converted to lowercase.
	 * @returns `true` if the value is one of the strings defined in IEnvironmentVariablesConfig->truthyBooleanStrings. `false` otherwise (including the case when the variable is not present).
	 */
	public getAsBoolean(variableName: TVariable): boolean {
		const value = this.get(variableName);
		if (value === undefined) {
			return false;
		}

		return this.truthyBooleanStrings.includes(value.toLowerCase());
	}
}
