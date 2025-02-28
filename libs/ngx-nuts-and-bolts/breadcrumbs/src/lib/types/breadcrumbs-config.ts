import { TitleConfiguration } from './title-config';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type BreadcrumbsConfig<T> = {
	titleConfiguration: TitleConfiguration<T> | null;
	logLevel: 'debug' | 'silent';
};
