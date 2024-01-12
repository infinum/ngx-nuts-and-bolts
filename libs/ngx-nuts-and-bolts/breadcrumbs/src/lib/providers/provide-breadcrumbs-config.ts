import { InjectionToken, Provider } from '@angular/core';
import { BreadcrumbsConfig } from '../types';

export const BREADCRUMBS_CONFIG = new InjectionToken<BreadcrumbsConfig<unknown>>('BREADCRUMBS_CONFIG_TOKEN');

export const DEFAULT_BREADCRUMBS_CONFIG: BreadcrumbsConfig<unknown> = {
	titleConfiguration: null,
	logLevel: 'silent',
};

export function provideBreadcrumbsConfig<T>(config: Partial<BreadcrumbsConfig<T>>): Provider {
	const finalConfig = {
		...DEFAULT_BREADCRUMBS_CONFIG,
		...config,
	};

	return {
		provide: BREADCRUMBS_CONFIG,
		useValue: finalConfig,
	};
}
