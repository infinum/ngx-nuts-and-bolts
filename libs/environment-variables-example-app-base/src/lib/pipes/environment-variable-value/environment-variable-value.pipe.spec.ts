import { TestBed } from '@angular/core/testing';
import { EnvironmentVariable } from '../../enums/environment-variable.enum';
import { MyAppEnvironmentVariablesTestingModule } from '../../testing/my-app-environment-variables.testing.module';
import { EnvironmentVariableValuePipe } from './environment-variable-value.pipe';

describe('environment variable value pipe', () => {
	let pipe: EnvironmentVariableValuePipe;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MyAppEnvironmentVariablesTestingModule],
			providers: [EnvironmentVariableValuePipe],
		});

		pipe = TestBed.inject(EnvironmentVariableValuePipe);
	});

	it('should get environment variable value', () => {
		expect(pipe.transform(EnvironmentVariable.FOO)).toBe('I am Foo (testing)');
	});
});
