import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WINDOW } from '../global-tokens';

export const confirmEntryGuard: CanActivateFn = (route) => {
	const router = inject(Router);
	if (router.getCurrentNavigation()?.id === 1) {
		return true;
	}

	const window = inject(WINDOW);
	return window.confirm(`Are you sure you want to navigate to "${route.url}"?`);
};
