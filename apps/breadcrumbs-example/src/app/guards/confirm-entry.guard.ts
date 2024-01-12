import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { WINDOW } from '../global-tokens';

export const confirmEntryGuard: CanActivateFn = () => {
	const window = inject(WINDOW);
	return window.confirm('Are you sure you want to navigate?');
};
