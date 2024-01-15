export class MockStorage {
	protected localStore: { [key: string]: unknown } = {};

	public get length() {
		return Object.keys(this.localStore).length;
	}

	public getItem(key: string) {
		return this.localStore[key];
	}

	public setItem(key: string, value: unknown) {
		this.localStore[key] = value + '';
	}

	public removeItem(key: string) {
		delete this.localStore[key];
	}

	public clear() {
		this.localStore = {};
	}
}
