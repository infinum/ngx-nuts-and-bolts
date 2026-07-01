import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { fadeAnimation } from './fade.animation';
import { heightAnimation } from './height.animation';

@Component({
	selector: 'inf-height-fade-animations-host',
	standalone: true,
	imports: [CommonModule],
	template: `
		<button class="accordion-toggle" type="button" (click)="isOpened = !isOpened">Toggle</button>

		@if (isOpened) {
			<div @height @fade class="panel">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
					magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat.
				</p>
			</div>
		}
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

const meta = {
	title: 'HeightFadeAnimations',
	component: HeightFadeAnimationsHostComponent,
	tags: ['autodocs'],
	decorators: [
		applicationConfig({
			providers: [provideAnimations()],
		}),
	],
} satisfies Meta<HeightFadeAnimationsHostComponent>;

export default meta;

type Story = StoryObj<HeightFadeAnimationsHostComponent>;

export const Default: Story = {};
