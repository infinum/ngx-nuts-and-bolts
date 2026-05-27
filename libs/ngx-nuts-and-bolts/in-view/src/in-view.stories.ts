import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { InViewDirective } from './in-view.directive';

@Component({
	selector: 'inf-in-view-story',
	standalone: true,
	imports: [InViewDirective],
	template: `
		<div class="blocks">
			@for (item of items; track $index; let index = $index) {
				<div class="block" infInView #infInViewRef="infInView" [class.in-view]="infInViewRef.isInView">
					Block #{{ index }}
				</div>
			}
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

const meta = {
	title: 'InView',
	component: InViewStoryComponent,
	tags: ['autodocs'],
} satisfies Meta<InViewStoryComponent>;

export default meta;

type Story = StoryObj<InViewStoryComponent>;

export const Default: Story = {};
