// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TitleConfiguration<T> = {
	formatter?: (breadcrumbs: Array<T>) => string;
};
