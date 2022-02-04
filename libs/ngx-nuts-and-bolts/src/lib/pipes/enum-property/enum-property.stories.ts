import { Component } from '@angular/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { EnumPropertyModule } from './enum-property.module';

enum TestingEnum {
	FOO = 'foo',
	BAR = 'bar',
}

interface ITestingEnumData {
	translationKey: string;
	theAnswer: number;
}

const testingEnumData: Record<TestingEnum, ITestingEnumData> = {
	[TestingEnum.FOO]: {
		theAnswer: 42,
		translationKey: 'testingEnum.foo',
	},
	[TestingEnum.BAR]: {
		theAnswer: 69,
		translationKey: 'testingEnum.bar',
	},
};

@Component({
	template: ` {{ enumPropertyValue | enumProperty: testingEnumData:'translationKey' }} `,
})
class EnumPropertyPipeHostComponent {
	public enumPropertyValue = TestingEnum.BAR;
	public testingEnumData = testingEnumData;
}

export default {
	title: 'EnumPropertyPipe',
	component: EnumPropertyPipeHostComponent,
	decorators: [moduleMetadata({ declarations: [EnumPropertyPipeHostComponent], imports: [EnumPropertyModule] })],
} as Meta<EnumPropertyPipeHostComponent>;

const Template: Story<EnumPropertyPipeHostComponent> = (args: EnumPropertyPipeHostComponent) => ({
	component: EnumPropertyPipeHostComponent,
	props: args,
});

export const Default = Template.bind({});
Default.args = {};
