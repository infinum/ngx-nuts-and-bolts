import { Inject, Injectable, Optional } from '@angular/core';
import { ENVIRONMENT_VARIABLES_CONFIG } from './environment-variables-config.token';
import { EnvironmentVariablesConfig } from './environment-variables-config.type';
import { ENVIRONMENT_VARIABLES_RECORD } from './environment-variables-record.token';
import { EnvironmentVariablesRecord } from './environment-variables-record.type';

const DEFAULT_TRUTHY_BOOLEAN_STRINGS = ['true', '1'];

@Injectable({ providedIn: 'root' })
export class EnvironmentVariablesService<TVariable extends string> {
	private readonly truthyBooleanStrings = this.config?.truthyBooleanStrings ?? DEFAULT_TRUTHY_BOOLEAN_STRINGS;

	constructor(
		@Inject(ENVIRONMENT_VARIABLES_RECORD) private readonly variables: Partial<EnvironmentVariablesRecord<TVariable>>,
		@Optional() @Inject(ENVIRONMENT_VARIABLES_CONFIG) private readonly config?: EnvironmentVariablesConfig
	) {}

	public get(variableName: TVariable): string | undefined {
		return this.variables[variableName];
	}

	public getAsNumber(variableName: TVariable): number | undefined {
		const value = this.get(variableName);
		return value === undefined ? undefined : Number(value);
	}

	/**
	 * @description Transforms the of an environment variable into a boolean. Configurable via EnvironmentVariablesConfig->truthyBooleanStrings. Before comparison, the actual value is converted to lowercase.
	 * @returns `true` if the value is one of the strings defined in EnvironmentVariablesConfig->truthyBooleanStrings. `false` otherwise (including the case when the variable is not present).
	 */
	public getAsBoolean(variableName: TVariable): boolean {
		const value = this.get(variableName);
		if (value === undefined) {
			return false;
		}

		return this.truthyBooleanStrings.includes(value.toLowerCase());
	}
}
