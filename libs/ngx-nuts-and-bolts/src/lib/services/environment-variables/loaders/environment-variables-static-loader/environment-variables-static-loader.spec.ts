import { TestBed } from '@angular/core/testing';
import { EnvironmentVariablesStaticLoader } from './environment-variables-static-loader';

enum EnvironmentVariable {
	FOO = 'foo',
	BAR = 'bar',
}

describe('EnvironmentVariablesWindowLoader', () => {
	let service: EnvironmentVariablesStaticLoader<EnvironmentVariable>;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(EnvironmentVariablesStaticLoader);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
