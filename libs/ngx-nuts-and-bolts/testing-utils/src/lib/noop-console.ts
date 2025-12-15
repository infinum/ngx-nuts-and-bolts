/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Provider } from '@angular/core';
import { CONSOLE } from '@infinum/ngx-nuts-and-bolts';
import { noop } from 'rxjs';
import { ExtractPublic } from './extract-public.type';

export class NoopConsole implements Partial<ExtractPublic<Console>> {
	public error(...data: Array<any>): void {
		noop();
	}
	public info(...data: Array<any>): void {
		noop();
	}
	public log(...data: Array<any>): void {
		noop();
	}
	public warn(...data: Array<any>): void {
		noop();
	}
}

export function provideNoopConsole(): Provider {
	return {
		provide: CONSOLE,
		useClass: NoopConsole,
	};
}
