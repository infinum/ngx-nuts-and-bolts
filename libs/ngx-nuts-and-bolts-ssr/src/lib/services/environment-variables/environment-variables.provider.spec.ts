import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StateKey, TransferState } from '@angular/platform-browser';
import { EnvironmentVariablesService } from '@infinum/ngx-nuts-and-bolts/env';
import { PROCESS } from '../../di-tokens';
import { provideUniversalEnvironmentVariables } from './environment-variables.provider';

enum EnvironmentVariable {
	Foo = 'FOO',
	Bar = 'BAR',
	Baz = 'BAZ',
}

describe('provideUniversalEnvironmentVariables', () => {
	let envService: EnvironmentVariablesService<EnvironmentVariable>;
	let transferStateGetSpy: jest.SpyInstance;
	let transferStateSetSpy: jest.SpyInstance;

	describe('on server', () => {
		beforeEach(() => {
			init('server');
		});

		it('should provide both public and private variables', () => {
			expect(envService.get(EnvironmentVariable.Foo)).toBe('foo');
			expect(envService.get(EnvironmentVariable.Bar)).toBe('bar');
			expect(envService.get(EnvironmentVariable.Baz)).toBe('baz');
		});

		it('should set state for transfer only for public variables', () => {
			expect(transferStateSetSpy).toHaveBeenCalledWith('ENVIRONMENT_VARIABLES_RECORD', {
				[EnvironmentVariable.Foo]: 'foo',
				[EnvironmentVariable.Bar]: 'bar',
			});
		});

		it('should not call TransferState#get', () => {
			expect(transferStateGetSpy).not.toHaveBeenCalled();
		});

		it('should call TransferState#set', () => {
			expect(transferStateSetSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('on client', () => {
		beforeEach(() => {
			init('browser');
		});

		it('should be able to read public variables', () => {
			expect(envService.get(EnvironmentVariable.Foo)).toBe('foo');
			expect(envService.get(EnvironmentVariable.Bar)).toBe('bar');
		});

		it('should not be able to read private variables', () => {
			expect(envService.get(EnvironmentVariable.Baz)).toBe(undefined);
		});

		it('should not call TransferState#set', () => {
			expect(transferStateSetSpy).not.toHaveBeenCalled();
		});

		it('should call TransferState#get', () => {
			expect(transferStateGetSpy).toHaveBeenCalledTimes(1);
		});
	});

	function init(platform: 'server' | 'browser') {
		const transferState = new TransferStateMock();
		transferStateGetSpy = jest.spyOn(transferState, 'get');
		transferStateSetSpy = jest.spyOn(transferState, 'set');

		if (platform === 'browser') {
			transferStateGetSpy.mockReturnValue({
				[EnvironmentVariable.Foo]: 'foo',
				[EnvironmentVariable.Bar]: 'bar',
			});
		}

		TestBed.configureTestingModule({
			providers: [
				provideUniversalEnvironmentVariables({
					publicVariables: [EnvironmentVariable.Foo, EnvironmentVariable.Bar],
					privateVariables: [EnvironmentVariable.Baz],
				}),
				{
					provide: PROCESS,
					useValue: {
						env: {
							[EnvironmentVariable.Foo]: 'foo',
							[EnvironmentVariable.Bar]: 'bar',
							[EnvironmentVariable.Baz]: 'baz',
						},
					},
				},
				{
					provide: PLATFORM_ID,
					useValue: platform,
				},
				{
					provide: TransferState,
					useValue: transferState,
				},
			],
		});

		envService = TestBed.inject<EnvironmentVariablesService<EnvironmentVariable>>(EnvironmentVariablesService);
	}

	describe('when no PROCESS is provided', () => {
		describe('on server', () => {
			it('should throw an error if no process is provided', () => {
				TestBed.configureTestingModule({
					providers: [
						provideUniversalEnvironmentVariables({
							publicVariables: [EnvironmentVariable.Foo, EnvironmentVariable.Bar],
							privateVariables: [EnvironmentVariable.Baz],
						}),
						{
							provide: PLATFORM_ID,
							useValue: 'server',
						},
						{
							provide: TransferState,
							useClass: TransferStateMock,
						},
					],
				});

				expect(() => TestBed.inject(EnvironmentVariablesService)).toThrowError(
					'No process found. Please provide a process object via the PROCESS injection token.'
				);
			});
		});

		describe('on browser', () => {
			it('should not throw an error if no process is provided', () => {
				TestBed.configureTestingModule({
					providers: [
						provideUniversalEnvironmentVariables({
							publicVariables: [EnvironmentVariable.Foo, EnvironmentVariable.Bar],
							privateVariables: [EnvironmentVariable.Baz],
						}),
						{
							provide: PLATFORM_ID,
							useValue: 'browser',
						},
						{
							provide: TransferState,
							useClass: TransferStateMock,
						},
					],
				});

				expect(() => TestBed.inject(EnvironmentVariablesService)).not.toThrowError();
			});
		});
	});
});

class TransferStateMock {
	private readonly record: Record<string, unknown> = {};

	public get<T>(key: StateKey<T>, defaultValue: T): T {
		return (this.record[key] as T) ?? defaultValue;
	}

	public set<T>(key: StateKey<T>, value: T): void {
		this.record[key] = value;
	}
}
