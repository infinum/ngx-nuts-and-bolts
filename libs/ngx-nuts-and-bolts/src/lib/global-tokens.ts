import { InjectionToken } from '@angular/core';

export const CONSOLE = new InjectionToken<Console>('CONSOLE');
export function provideConsole(console: Console) {
	return {
		provide: CONSOLE,
		useValue: console,
	};
}

export const WINDOW = new InjectionToken<Window>('WINDOW');
export function provideWindow(window: Window) {
	return {
		provide: WINDOW,
		useValue: window,
	};
}
