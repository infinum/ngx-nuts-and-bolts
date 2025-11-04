import { Breadcrumb } from './breadcrumb';

export type TitleConfiguration<T> = {
	formatter: (breadcrumbs: Array<Breadcrumb<T>>) => string;
};
