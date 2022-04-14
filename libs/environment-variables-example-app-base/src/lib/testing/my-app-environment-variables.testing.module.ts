import { EnvironmentVariablesTestingModule } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariable } from '../enums/environment-variable.enum';

export const MyAppEnvironmentVariablesTestingModule = EnvironmentVariablesTestingModule.withMockEnvironment({
	[EnvironmentVariable.FOO]: 'I am Foo (testing)',
	[EnvironmentVariable.BAR]: 'I am Bar (testing)',
});
