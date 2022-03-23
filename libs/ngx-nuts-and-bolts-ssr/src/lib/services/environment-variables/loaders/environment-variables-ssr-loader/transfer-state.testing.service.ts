/* eslint-disable @typescript-eslint/no-unused-vars */

import { StateKey, TransferState } from '@angular/platform-browser';
import { ExtractPublic } from '@infinumjs/ngx-nuts-and-bolts';

export class TransferStateTestingService implements ExtractPublic<TransferState> {
	get<T>(_key: StateKey<T>, _defaultValue: T): T {
		throw new Error('Method not implemented.');
	}

	set<T>(_key: StateKey<T>, _value: T): void {
		throw new Error('Method not implemented.');
	}

	remove<T>(_key: StateKey<T>): void {
		throw new Error('Method not implemented.');
	}

	hasKey<T>(_key: StateKey<T>): boolean {
		throw new Error('Method not implemented.');
	}

	onSerialize<T>(_key: StateKey<T>, _callback: () => T): void {
		throw new Error('Method not implemented.');
	}

	toJson(): string {
		throw new Error('Method not implemented.');
	}
}
