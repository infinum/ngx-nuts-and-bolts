import { TestBed } from '@angular/core/testing';
import { EnvironmentVariablesService } from './environment-variables.service';

enum EnvironmentVariable {
	FOO = 'FOO',
	BAR = 'BAR',
}

describe('EnvironmentVariablesService', () => {
	let service: EnvironmentVariablesService<EnvironmentVariable>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [EnvironmentVariablesService],
		});
		service = TestBed.inject(EnvironmentVariablesService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should initialize and get the variables', () => {
		expect(service.get(EnvironmentVariable.FOO)).toBe('foo');
	});

	it('should throw an error when getting a variable before init', () => {
		expect(() => {
			service.get(EnvironmentVariable.FOO);
		}).toThrowError('Environment variables are not initialized.');
	});
});
