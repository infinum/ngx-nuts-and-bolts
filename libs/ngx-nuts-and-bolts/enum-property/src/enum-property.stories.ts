import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
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

@Component({
	selector: 'inf-enum-property-pipe-host',
	standalone: true,
	imports: [EnumPropertyPipe],
	template: `
		@for (enumEntry of enumEntries; track enumEntry[0]) {
			<div>
				<code>translationKey</code> for enum [key: <code>{{ enumEntry[0] }}</code
				>] [value: <code>{{ enumEntry[1] }}</code
				>]: <code>{{ enumEntry[1] | enumProperty: testingEnumData : 'translationKey' }}</code>
			</div>
		}
	`,
})
class EnumPropertyPipeHostComponent {
	public enumEntries = Object.entries(TestingEnum);
	public testingEnumData = testingEnumData;
}

const meta = {
	title: 'EnumPropertyPipe',
	component: EnumPropertyPipeHostComponent,
	tags: ['autodocs'],
} satisfies Meta<EnumPropertyPipeHostComponent>;

export default meta;

type Story = StoryObj<EnumPropertyPipeHostComponent>;

export const Default: Story = {};
