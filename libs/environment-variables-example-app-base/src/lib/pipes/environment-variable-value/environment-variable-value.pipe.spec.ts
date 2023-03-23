import { TestBed } from '@angular/core/testing';
import { provideEnvironmentVariables } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariable } from '../../enums/environment-variable.enum';
import { EnvironmentVariableValuePipe } from './environment-variable-value.pipe';

describe('environment variable value pipe', () => {
	let pipe: EnvironmentVariableValuePipe;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				EnvironmentVariableValuePipe,
				provideEnvironmentVariables({
					[EnvironmentVariable.Foo]: 'I am Foo (testing)',
					[EnvironmentVariable.Bar]: 'I am Bar (testing)',
				}),
			],
		});

		pipe = TestBed.inject(EnvironmentVariableValuePipe);
	});

	it('should get environment variable value', () => {
		expect(pipe.transform(EnvironmentVariable.Foo)).toBe('I am Foo (testing)');
	});
});
