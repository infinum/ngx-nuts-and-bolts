import { InjectionToken } from '@angular/core';

export type EnvironmentVariablesRecord<TVariable extends string> = Record<TVariable, string | undefined>;
export const ENVIRONMENT_VARIABLES_RECORD = new InjectionToken<EnvironmentVariablesRecord<string>>('VARIABLES');
