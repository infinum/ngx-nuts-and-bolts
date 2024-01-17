import { MockStorage } from './mock-storage';

fdescribe('MockStorage', () => {
	let mockStorage: MockStorage;

	beforeEach(() => {
		mockStorage = new MockStorage();
	});

	it('should create instance', () => {
		expect(mockStorage).toBeTruthy();
	});

	it('should have length 0 before adding any values', () => {
		expect(mockStorage.length).toBe(0);
	});

	it('should have length 1 after adding one value', () => {
		mockStorage.setItem('foo', 'bar');
		expect(mockStorage.length).toBe(1);
	});

	it('should have length 0 after clearing storage', () => {
		mockStorage.setItem('foo', 'bar');
		mockStorage.clear();
		expect(mockStorage.length).toBe(0);
	});

	it('should fetch the key from the storage', () => {
		mockStorage.setItem('foo', '');
		expect(mockStorage.key(0)).toBe('foo');
	});

	it('should get the item from the storage', () => {
		mockStorage.setItem('foo', 'bar');
		expect(mockStorage.getItem('foo')).toBe('bar');
	});

	it('should remove the item from the storage', () => {
		mockStorage.setItem('foo', 'bar');
		mockStorage.removeItem('foo');
		expect(mockStorage.getItem('foo')).toBeUndefined();
	});
});
