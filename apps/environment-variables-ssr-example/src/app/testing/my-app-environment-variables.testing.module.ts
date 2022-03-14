import { EnvironmentVariablesTestingModule } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariable } from '../enums/environment-variable.enum';

export const MyAppEnvironmentVariablesTestingModule = EnvironmentVariablesTestingModule.withEnvironment({
	[EnvironmentVariable.FOO]: 'I am foo (testing)',
	[EnvironmentVariable.BAR]: 'I am bar (testing)',
});
