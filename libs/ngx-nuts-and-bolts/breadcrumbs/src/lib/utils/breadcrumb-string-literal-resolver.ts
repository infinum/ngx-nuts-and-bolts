import { BreadcrumbResolver } from '../types';

export const breadcrumbLiteralResolver: <T>(value: T) => BreadcrumbResolver<T> = (value) => {
	return () => {
		return {
			breadcrumbData: value,
		};
	};
};

export const breadcrumbStringResolver: (value: string) => BreadcrumbResolver<string> =
	breadcrumbLiteralResolver<string>;
