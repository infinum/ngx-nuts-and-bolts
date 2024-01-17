export class MockStorage implements Storage {
	protected localStore: { [key: string]: string | null } = {};

	public get length() {
		return Object.keys(this.localStore).length;
	}

	public key(index: number): string | null {
		return Object.keys(this.localStore)[index] || null;
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
