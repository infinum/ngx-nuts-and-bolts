import { Component } from '@angular/core';
import { moduleMetadata, Story } from '@storybook/angular';
import { FullscreenTriggerForModule } from './fullscreen-trigger-for.module';

@Component({
	template: `
		<div class="container">
			<div
				#fullscreenElement
        id="fullscreenElement"
				class="fullscreen-element"
			>
        <button [infFullscreenTriggerFor]="fullscreenElement" #fullscreenState="infFullscreen" id="fsbtn">View in fullscreen</button>
				<h2 *ngIf="!fullscreenState.isFullscreen">Element to show in fullscreen</h2>
        <form>
          <div>
            <label for="firstName">First name</label>
            <input id="firstName" type="text">
          </div>

          <div>
            <label for="lastName">Last name</label>
            <input id="lastName" type="text">
          </div>

          <div>
            <label for="email">email</label>
            <input id="email" type="email">
          </div>

          <div>
            <label for="password">Password</label>
            <input id="password" type="password">
          </div>
        </form>
			</div>
			<div
				class="fullscreen-element"
			>
				<h2>Another element</h2>
        <form>
          <div>
            <label for="firstName">First name</label>
            <input id="firstName" type="text">
          </div>

          <div>
            <label for="lastName">Last name</label>
            <input id="lastName" type="text">
          </div>

          <div>
            <label for="email">email</label>
            <input id="email" type="email">
          </div>

          <div>
            <label for="password">Password</label>
            <input id="password" type="password">
          </div>
        </form>
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
			.container {
				display: flex;
				flex-direction: column;
				gap: 10px;
				height: 100%;
				width: 100%;
			}
			.fullscreen-element {
				display: grid;
				place-items: center;
				color: #fff;
				width: 100%;
				height: clamp(200px, 25vh, 400px);
				background: teal;
			}

      .fullscreen-element:-webkit-full-screen {
        background: #25c2a0;
        color: #000066;
      }

      .fullscreen-element:-webkit-full-screen #fsbtn {
        display: none;
      }

      .fullscreen-element:-moz-full-screen {
        background: #25c2a0;
        color: #000066;
      }
		`,
	],
})
class FullscreenTriggerForStoryComponent {
  constructor() {
    console.log('test');
  }
}

export default {
	title: 'FullscreenTriggerFor',
	component: FullscreenTriggerForStoryComponent,
	decorators: [
		moduleMetadata({
			declarations: [FullscreenTriggerForStoryComponent],
			imports: [FullscreenTriggerForModule],
		}),
	],
};

const Template: Story<FullscreenTriggerForStoryComponent> = (args: FullscreenTriggerForStoryComponent) => ({
	component: FullscreenTriggerForStoryComponent,
	props: args,
});

export const Default = Template.bind({});
Default.args = {};
