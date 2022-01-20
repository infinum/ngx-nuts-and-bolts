import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { fadeAnimation } from './fade.animation';
import { heightAnimation } from './height.animation';

@Component({
	template: `
		<button class="accordion-toggle" (click)="isOpened = !isOpened">Toggle</button>

		<div *ngIf="isOpened" @height @fade class="panel">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
				magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
				consequat.
			</p>
		</div>
	`,
	styles: [
		`
			.accordion-toggle {
				background-color: #eee;
				color: #444;
				cursor: pointer;
				padding: 18px;
				border: 1px;
				text-align: left;
				font-size: 15px;
			}

			.active,
			.accordion:hover {
				background-color: #ccc;
			}

			.panel {
				position: absolute;
				height: 100%;
				padding: 0 18px;
				background-color: #f0ead6;
				overflow: hidden;
			}
		`,
	],
	animations: [heightAnimation(), fadeAnimation()],
})
class HeightFadeAnimationsHostComponent {
	public isOpened = false;
}

export default {
	title: 'HeightFadeAnimations',
	component: HeightFadeAnimationsHostComponent,
	decorators: [
		moduleMetadata({
			declarations: [HeightFadeAnimationsHostComponent],
			imports: [BrowserAnimationsModule],
		}),
	],
} as Meta<HeightFadeAnimationsHostComponent>;

const Template: Story<HeightFadeAnimationsHostComponent> = (args: HeightFadeAnimationsHostComponent) => ({
	component: HeightFadeAnimationsHostComponent,
	props: args,
});

export const Default = Template.bind({});
Default.args = {};
