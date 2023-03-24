import { EnumPropertyPipe } from './enum-property.pipe';

enum TestingEnum {
	Foo = 'foo',
	Bar = 'bar',
}

interface ITestingEnumData {
	translationKey: string;
	theAnswer: number;
}

const testingEnumData: Record<TestingEnum, ITestingEnumData> = {
	[TestingEnum.Foo]: {
		theAnswer: 42,
		translationKey: 'testingEnum.foo',
	},
	[TestingEnum.Bar]: {
		theAnswer: 69,
		translationKey: 'testingEnum.bar',
	},
};

describe('EnumPropertyPipe', () => {
	let pipe: EnumPropertyPipe<
		TestingEnum,
		{
			theAnswer: number;
			translationKey: string;
		},
		number | string
	>;

	beforeEach(() => {
		pipe = new EnumPropertyPipe();
	});

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('should return the enum translation key property by default', () => {
		const result = pipe.transform(TestingEnum.Foo, testingEnumData);
		expect(result).toBe('testingEnum.foo');
	});

	it('should return the answer a specific property', () => {
		const result = pipe.transform(TestingEnum.Foo, testingEnumData, 'theAnswer');
		expect(result).toBe(42);
	});

	it('should return null and show a warning (by default) if there is no property key for passed value', () => {
		console.warn = jest.fn();
		const result = pipe.transform('i am not part of the enum' as TestingEnum, testingEnumData);

		expect(console.warn).toHaveBeenCalledTimes(1);
		expect(result).toBe(null);
	});

	it('should return null and not show a warning (if said explicitly) if there is no property key for passed value', () => {
		console.warn = jest.fn();
		const result = pipe.transform('i am not part of the enum' as TestingEnum, testingEnumData, 'translationKey', false);

		expect(console.warn).toHaveBeenCalledTimes(0);
		expect(result).toBe(null);
	});
});
