import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StateKey, TransferState } from '@angular/platform-browser';
import { EnvironmentVariablesRecord, ExtractPublic } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariablesSSRLoader } from './environment-variables-ssr-loader';
import {
	ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG,
	IEnvironmentVariablesSSRLoaderConfig,
	PROCESS,
} from './environment-variables-ssr-loader-utils';

enum EnvironmentVariable {
	FOO = 'foo',
	BAR = 'bar',
}

class TransferStateTestingService implements ExtractPublic<TransferState> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	get<T>(_key: StateKey<T>, _defaultValue: T): T {
		throw new Error('Method not implemented.');
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	set<T>(_key: StateKey<T>, _value: T): void {
		throw new Error('Method not implemented.');
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	remove<T>(_key: StateKey<T>): void {
		throw new Error('Method not implemented.');
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	hasKey<T>(_key: StateKey<T>): boolean {
		throw new Error('Method not implemented.');
	}
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onSerialize<T>(_key: StateKey<T>, _callback: () => T): void {
		throw new Error('Method not implemented.');
	}
	toJson(): string {
		throw new Error('Method not implemented.');
	}
}

describe('Environment variables SSR loader service', () => {
	let service: EnvironmentVariablesSSRLoader<EnvironmentVariable>;
	let config: IEnvironmentVariablesSSRLoaderConfig<EnvironmentVariable>;
	let transferState: TransferState;
	let expectedRecord: EnvironmentVariablesRecord<EnvironmentVariable>;

	beforeEach(() => {
		config = {
			variablesToLoad: [EnvironmentVariable.FOO, EnvironmentVariable.BAR],
		};

		expectedRecord = {
			[EnvironmentVariable.FOO]: 'I am Foo',
			[EnvironmentVariable.BAR]: 'I am Bar',
		};
	});

	describe('on server-side', () => {
		let process: Partial<NodeJS.Process>;

		beforeEach(() => {
			process = {
				env: {
					[EnvironmentVariable.FOO]: 'I am Foo',
					[EnvironmentVariable.BAR]: 'I am Bar',
					I_AM_A_SECRET_DO_NOT_TRANSFER_ME: 'Super secret',
				},
			};

			TestBed.configureTestingModule({
				providers: [
					EnvironmentVariablesSSRLoader,
					{
						provide: PROCESS,
						useValue: process,
					},
					{
						provide: PLATFORM_ID,
						useValue: 'server',
					},
					{
						provide: ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG,
						useValue: config,
					},
					{
						provide: TransferState,
						useClass: TransferStateTestingService,
					},
				],
			});

			transferState = TestBed.inject(TransferState);
			service = TestBed.inject(EnvironmentVariablesSSRLoader);
		});

		it('should load environment variables from process.env and prepare them for transfer', () => {
			const getSpy = jest.spyOn(transferState, 'get').mockImplementation();
			const setSpy = jest.spyOn(transferState, 'set').mockImplementation();

			expect(setSpy).toHaveBeenCalledTimes(0);
			expect(getSpy).toHaveBeenCalledTimes(0);

			const result = service.load();

			expect(setSpy).toHaveBeenCalledTimes(1);
			expect(getSpy).toHaveBeenCalledTimes(0);
			expect(setSpy.mock.calls[0][1]).toEqual(expectedRecord);
			expect(result).toEqual(expectedRecord);
		});
	});

	describe('on server-side without provided process', () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [
					EnvironmentVariablesSSRLoader,
					{
						provide: PLATFORM_ID,
						useValue: 'server',
					},
					{
						provide: ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG,
						useValue: config,
					},
					{
						provide: TransferState,
						useClass: TransferStateTestingService,
					},
				],
			});

			service = TestBed.inject(EnvironmentVariablesSSRLoader);
		});

		it('should throw an error', () => {
			expect(() => {
				service.load();
			}).toThrowError('Process is not defined, please provide it under the PROCESS injection token');
		});
	});

	describe('on client-side', () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [
					EnvironmentVariablesSSRLoader,
					{
						provide: PLATFORM_ID,
						useValue: 'browser',
					},
					{
						provide: ENVIRONMENT_VARIABLES_SSR_LOADER_CONFIG,
						useValue: config,
					},
					{
						provide: TransferState,
						useClass: TransferStateTestingService,
					},
				],
			});

			transferState = TestBed.inject(TransferState);
			service = TestBed.inject(EnvironmentVariablesSSRLoader);
		});

		it('should load environment variables from transfered state', () => {
			const getSpy = jest.spyOn(transferState, 'get').mockImplementation(() => expectedRecord);
			const setSpy = jest.spyOn(transferState, 'set').mockImplementation();

			expect(setSpy).toHaveBeenCalledTimes(0);
			expect(getSpy).toHaveBeenCalledTimes(0);

			const result = service.load();

			expect(setSpy).toHaveBeenCalledTimes(0);
			expect(getSpy).toHaveBeenCalledTimes(1);
			expect(result).toEqual(expectedRecord);
		});
	});
});
