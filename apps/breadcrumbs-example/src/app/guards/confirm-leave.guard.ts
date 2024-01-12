import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { WINDOW } from '@infinum/ngx-nuts-and-bolts';

export const confirmLeaveGuard: CanDeactivateFn<unknown> = (_, currentRoute) => {
	const window = inject(WINDOW);
	return window.confirm(`Are you sure you want to navigate away from "${currentRoute.url}"?`);
};
