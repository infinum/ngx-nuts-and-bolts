import { Component } from '@angular/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { EnumPropertyPipe } from './enum-property.pipe';

enum TestingEnum {
	Foo = 'foo',
	Bar = 'bar',
}

type TestingEnumData = {
	translationKey: string;
	theAnswer: number;
};

const testingEnumData: Record<TestingEnum, TestingEnumData> = {
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
	template: `
		<div *ngFor="let enumEntry of enumEntries">
			<code>translationKey</code> for enum

			<!-- RIP prettier. TODO: figure out how to make sure that prettier formats this nicely -->
			<ng-container>
				[key: <code>{{ enumEntry[0] }}</code
				>]
			</ng-container>

			<ng-container>
				[value: <code>{{ enumEntry[1] }}</code> </ng-container
			>]:
			<code>{{ enumEntry[1] | enumProperty : testingEnumData : 'translationKey' }}</code>
		</div>
	`,
})
class EnumPropertyPipeHostComponent {
	public enumEntries = Object.entries(TestingEnum);
	public testingEnumData = testingEnumData;
}

export default {
	title: 'EnumPropertyPipe',
	component: EnumPropertyPipeHostComponent,
	decorators: [moduleMetadata({ declarations: [EnumPropertyPipeHostComponent], imports: [EnumPropertyPipe] })],
} as Meta<EnumPropertyPipeHostComponent>;

const Template: Story<EnumPropertyPipeHostComponent> = (args: EnumPropertyPipeHostComponent) => ({
	component: EnumPropertyPipeHostComponent,
	props: args,
});

export const Default = Template.bind({});
Default.args = {};
