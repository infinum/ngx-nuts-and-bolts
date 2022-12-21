import { EnvironmentVariablesService } from './environment-variables.service';

enum EnvironmentVariable {
	FOO = 'FOO',
	BAR = 'BAR',
}

describe('EnvironmentVariablesModule + initializer', () => {
	let service: EnvironmentVariablesService<EnvironmentVariable>;

	it('should provide and initialize the service', () => {
		expect(service).toBeTruthy();

		expect(service.get(EnvironmentVariable.FOO)).toBe('foo');
	});
});
