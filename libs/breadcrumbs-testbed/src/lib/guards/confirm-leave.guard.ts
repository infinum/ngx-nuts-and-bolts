import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { WINDOW } from '@infinum/ngx-nuts-and-bolts';
import { NavigationPromptService } from '../services/navigation-prompt.service';

export const confirmLeaveGuard: CanDeactivateFn<unknown> = (_, currentRoute) => {
	const navigationPromptService = inject(NavigationPromptService);
	if (!navigationPromptService.promptDuringNavigation) {
		return true;
	}

	const window = inject(WINDOW);
	return window.confirm(`Are you sure you want to navigate away from "${currentRoute.url.toString()}"?`);
};
