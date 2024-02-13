import { InjectionToken, Provider } from '@angular/core';

export const PROCESS = new InjectionToken<NodeJS.Process>('PROCESS');

export function provideProcess(): Provider {
	return {
		provide: PROCESS,
		useValue: process,
	};
}
