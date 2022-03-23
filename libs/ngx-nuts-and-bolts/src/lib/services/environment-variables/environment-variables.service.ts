import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { EnvironmentVariablesRecord } from './environment-variables-record.type';

@Injectable()
export class EnvironmentVariablesService<TVariable extends string> {
	private variables?: EnvironmentVariablesRecord<TVariable>;
	private readonly _initDone$ = new BehaviorSubject(false);

	/** Emits true once the service has been initialized */
	public readonly initDone$ = this._initDone$.pipe(filter(Boolean), first());

	public init(variables: EnvironmentVariablesRecord<TVariable>): void {
		this.variables = variables;

		this._initDone$.next(true);
	}

	public get(variableName: TVariable): string | undefined {
		if (!this.variables) {
			throw new Error('Environment variables are not initialized.');
		}

		return this.variables[variableName];
	}
}
