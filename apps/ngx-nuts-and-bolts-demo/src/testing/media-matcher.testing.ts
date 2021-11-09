export function attachUnsupportedMatchMediaMethods(): void {
	// Taken from https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
	// Alternative solution is to create MediaMatcher test double

	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: jest.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(), // deprecated
			removeListener: jest.fn(), // deprecated
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		})),
	});
}
