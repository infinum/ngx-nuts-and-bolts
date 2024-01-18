import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WINDOW } from '@infinum/ngx-nuts-and-bolts';
import { NavigationPromptService } from '../services/navigation-prompt.service';

export const confirmEntryGuard: CanActivateFn = (route) => {
	const navigationPromptService = inject(NavigationPromptService);
	if (!navigationPromptService.promptDuringNavigation) {
		return true;
	}

	const router = inject(Router);
	if (router.getCurrentNavigation()?.id === 1) {
		return true;
	}

	const window = inject(WINDOW);
	return window.confirm(`Are you sure you want to navigate to "${route.url}"?`);
};
