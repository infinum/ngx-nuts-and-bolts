import { Component } from '@angular/core';
import { moduleMetadata, Story } from '@storybook/angular';
import { InViewDirective } from './in-view.directive';

@Component({
	template: `
		<div class="blocks">
			<div
				*ngFor="let item of items; let index = index"
				class="block"
				infInView
				#infInViewRef="infInView"
				[class.in-view]="infInViewRef.isInView"
			>
				Block #{{ index }}
			</div>
		</div>
	`,
	styles: [
		`
			:host {
				width: 100%;
				display: flex;
				gap: 10px;
				height: 100%;
				overflow: auto;
			}
			.blocks {
				display: flex;
				flex-direction: column;
				gap: 10px;
				height: 100%;
				width: 100%;
			}
			.block {
				display: grid;
				place-items: center;
				color: #fff;
				width: 100%;
				height: clamp(200px, 25vh, 400px);
				background: black;
				transition: 1s background;
			}
			.block.in-view {
				background: teal;
			}
		`,
	],
})
class InViewStoryComponent {
	public items = Array.from({ length: 20 });
}

export default {
	title: 'InView',
	component: InViewStoryComponent,
	decorators: [
		moduleMetadata({
			declarations: [InViewStoryComponent],
			imports: [InViewDirective],
		}),
	],
};

const Template: Story<InViewStoryComponent> = (args: InViewStoryComponent) => ({
	component: InViewStoryComponent,
	props: args,
});

export const Default = Template.bind({});
Default.args = {};
