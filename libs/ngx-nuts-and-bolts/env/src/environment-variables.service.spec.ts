import { TestBed } from '@angular/core/testing';
import { ENVIRONMENT_VARIABLES_RECORD } from './environment-variables-record.token';
import { EnvironmentVariablesService } from './environment-variables.service';

enum EnvironmentVariable {
	Foo = 'FOO',
	Bar = 'BAR',
	Num1 = 'NUM_1',
	Num2 = 'NUM_2',
	Num3 = 'NUM_3',
	Num4 = 'NUM_4',
	Bool1 = 'BOOL_1',
	Bool2 = 'BOOL_2',
	Bool3 = 'BOOL_3',
	Bool4 = 'BOOL_4',
	Bool5 = 'BOOL_5',
}

describe('EnvironmentVariablesService', () => {
	let service: EnvironmentVariablesService<EnvironmentVariable>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ENVIRONMENT_VARIABLES_RECORD,
					useValue: {
						[EnvironmentVariable.Foo]: 'foo',
						[EnvironmentVariable.Bar]: 'bar',
						[EnvironmentVariable.Num1]: '42',
						[EnvironmentVariable.Num2]: '3.14',
						[EnvironmentVariable.Num3]: '10e3',
						[EnvironmentVariable.Num4]: 'asdf',
						[EnvironmentVariable.Bool1]: 'true',
						[EnvironmentVariable.Bool2]: 'false',
						[EnvironmentVariable.Bool3]: '1',
						[EnvironmentVariable.Bool4]: '0',
						[EnvironmentVariable.Bool5]: 'TRUE',
					},
				},
			],
		});

		service = TestBed.inject<EnvironmentVariablesService<EnvironmentVariable>>(EnvironmentVariablesService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('as string', () => {
		it('should get variable value', () => {
			expect(service.get(EnvironmentVariable.Foo)).toBe('foo');
		});
	});

	describe('as number', () => {
		it('should get integer variable value', () => {
			expect(service.getAsNumber(EnvironmentVariable.Num1)).toBe(42);
		});

		it('should get integer decimal value', () => {
			expect(service.getAsNumber(EnvironmentVariable.Num2)).toBe(3.14);
		});

		it('should get scientific notation value', () => {
			expect(service.getAsNumber(EnvironmentVariable.Num3)).toBe(10_000);
		});

		it('should return NaN if value can not be parsed', () => {
			expect(service.getAsNumber(EnvironmentVariable.Num4)).toBeNaN();
		});
	});

	describe('as boolean', () => {
		it('should coerce "true" to true', () => {
			expect(service.getAsBoolean(EnvironmentVariable.Bool1)).toBe(true);
		});

		it('should coerce "false" to false', () => {
			expect(service.getAsBoolean(EnvironmentVariable.Bool2)).toBe(false);
		});

		it('should coerce "1" to true', () => {
			expect(service.getAsBoolean(EnvironmentVariable.Bool3)).toBe(true);
		});

		it('should coerce "0" to false', () => {
			expect(service.getAsBoolean(EnvironmentVariable.Bool4)).toBe(false);
		});

		it('should coerce "TRUE" to true', () => {
			expect(service.getAsBoolean(EnvironmentVariable.Bool5)).toBe(true);
		});
	});
});
