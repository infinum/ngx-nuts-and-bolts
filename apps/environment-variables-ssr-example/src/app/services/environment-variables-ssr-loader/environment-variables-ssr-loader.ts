import { isPlatformServer } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { EnvironmentVariablesRecord, IEnvironmentVariablesLoader } from '@infinumjs/ngx-nuts-and-bolts';
import { Observable } from 'rxjs';
import { EnvironmentVariable } from '../../enums/environment-variable.enum';

const envStateKey = makeStateKey<EnvironmentVariablesRecord<EnvironmentVariable>>('environmentVariables');

export class EnvironmentVariablesSSRLoader implements IEnvironmentVariablesLoader<EnvironmentVariable> {
	constructor(
		@Inject(PLATFORM_ID) private readonly platformId: string,
		private readonly transferState: TransferState,
		private readonly process?: NodeJS.Process
	) {}

	public load():
		| EnvironmentVariablesRecord<EnvironmentVariable>
		| Observable<EnvironmentVariablesRecord<EnvironmentVariable>> {
		if (isPlatformServer(this.platformId) && this.process) {
			const variables: EnvironmentVariablesRecord<EnvironmentVariable> = {
				[EnvironmentVariable.FOO]: this.process.env[EnvironmentVariable.FOO],
				[EnvironmentVariable.BAR]: this.process.env[EnvironmentVariable.BAR],
			};

			this.transferState.set(envStateKey, variables);

			return variables;
		} else {
			return this.transferState.get(envStateKey, {
				[EnvironmentVariable.FOO]: undefined,
				[EnvironmentVariable.BAR]: undefined,
			});
		}
	}
}
