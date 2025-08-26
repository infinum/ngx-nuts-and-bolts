import { TitleConfiguration } from './title-config';

export type BreadcrumbsConfig<T> = {
	titleConfiguration: TitleConfiguration<T> | null;
	logLevel: 'debug' | 'silent';
};
