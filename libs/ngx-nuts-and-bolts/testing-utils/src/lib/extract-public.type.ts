// eslint-disable-next-line @typescript-eslint/ban-types
export type ExtractPublic<T extends object> = {
	[K in keyof T]: T[K];
};
