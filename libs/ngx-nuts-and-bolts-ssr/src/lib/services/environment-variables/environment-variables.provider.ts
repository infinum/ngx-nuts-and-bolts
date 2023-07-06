import { isPlatformBrowser } from '@angular/common';
import { Optional, PLATFORM_ID, StaticProvider, TransferState, makeStateKey } from '@angular/core';
import { ENVIRONMENT_VARIABLES_RECORD, EnvironmentVariablesRecord } from '@infinum/ngx-nuts-and-bolts';
import { PROCESS } from '../../di-tokens';

export interface IUniversalEnvironmentVariablesProviderConfig<TVariable extends string> {
	/**
	 * @description List of variables that will be readable only on server-side and will not be transferred to the client.
	 */
	privateVariables?: Array<TVariable>;

	/**
	 * @description List of variables that will be readable on both server-side and client-side.
	 */
	publicVariables?: Array<TVariable>;
}

export function provideUniversalEnvironmentVariables<TVariable extends string>(
	config: IUniversalEnvironmentVariablesProviderConfig<TVariable>
): StaticProvider {
	const transferKey = makeStateKey<Partial<EnvironmentVariablesRecord<TVariable>>>('ENVIRONMENT_VARIABLES_RECORD');

	return {
		provide: ENVIRONMENT_VARIABLES_RECORD,
		useFactory: (
			platformId: Parameters<typeof isPlatformBrowser>[0],
			transferState: TransferState,
			process?: NodeJS.Process
		) => {
			if (isPlatformBrowser(platformId)) {
				return transferState.get(transferKey, {});
			}

			if (!process) {
				throw new Error('No process found. Please provide a process object via the PROCESS injection token.');
			}

			const publicVariables: Partial<EnvironmentVariablesRecord<TVariable>> = {};
			const privateVariables: Partial<EnvironmentVariablesRecord<TVariable>> = {};

			for (const publicVariable of config.publicVariables ?? []) {
				publicVariables[publicVariable] = process.env[publicVariable];
			}
			for (const privateVariable of config.privateVariables ?? []) {
				privateVariables[privateVariable] = process.env[privateVariable];
			}

			transferState.set(transferKey, publicVariables);

			return {
				...publicVariables,
				...privateVariables,
			};
		},
		deps: [PLATFORM_ID, TransferState, [new Optional(), PROCESS]],
	};
}
