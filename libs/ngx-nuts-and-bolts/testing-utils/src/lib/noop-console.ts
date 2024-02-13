/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Provider } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CONSOLE } from '@infinum/ngx-nuts-and-bolts';
import { ExtractPublic } from './extract-public.type';

export class NoopConsole implements Partial<ExtractPublic<Console>> {
	public error(...data: Array<any>): void {}
	public info(...data: Array<any>): void {}
	public log(...data: Array<any>): void {}
	public warn(...data: Array<any>): void {}
}

export function provideNoopConsole(): Provider {
	return {
		provide: CONSOLE,
		useClass: NoopConsole,
	};
}
