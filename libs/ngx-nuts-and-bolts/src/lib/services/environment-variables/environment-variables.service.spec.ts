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
});
