import { EnvironmentVariablesRecord } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariable } from '@ngx-nuts-and-bolts/environment-variables-example-app-base';

declare global {
	interface Window {
		env: EnvironmentVariablesRecord<EnvironmentVariable>;
	}
}
