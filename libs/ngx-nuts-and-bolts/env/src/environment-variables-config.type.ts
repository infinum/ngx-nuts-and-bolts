export type EnvironmentVariablesConfig = {
	/**
	 * @description An array of strings that will, when reading environment variable via `getAsBoolean`, be consider `true`. Before comparison, the actual value is converted to lowercase.
	 * @default ['true', '1']
	 */
	truthyBooleanStrings?: Array<string>;
};
