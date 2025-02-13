import { Meta, Story } from '@storybook/angular';
import { ResizeObserverDemoComponent } from './testing/resize-observer-demo.component';

export default {
	title: 'ResizeObserverDemoComponent',
	component: ResizeObserverDemoComponent,
} as Meta<ResizeObserverDemoComponent>;

const Template: Story<ResizeObserverDemoComponent> = (args: ResizeObserverDemoComponent) => ({
	props: args,
});

export const Default = Template.bind({});
Default.args = {};
