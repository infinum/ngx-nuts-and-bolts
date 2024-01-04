import { InjectionToken, Provider } from '@angular/core';
import { BreadcrumbsConfig } from '../types';

export const BREADCRUMBS_CONFIG = new InjectionToken<BreadcrumbsConfig<unknown>>('BREADCRUMBS_CONFIG_TOKEN');

export const DEFAULT_BREADCRUMBS_CONFIG: BreadcrumbsConfig<unknown> = {
	titleConfiguration: {},
};

export function provideBreadcrumbsConfig<T>(config: BreadcrumbsConfig<T> = DEFAULT_BREADCRUMBS_CONFIG): Provider {
	return {
		provide: BREADCRUMBS_CONFIG,
		useValue: config,
	};
}
