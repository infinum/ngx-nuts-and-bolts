import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ScrollToErrorModule } from './scroll-to-error.module';

@Component({
	template: `
		<p>(scroll me)</p>
		<p>(you can also resize me)</p>
		<form infScrollToError [formGroup]="userForm" #ngForm="ngForm">
			<!-- First name -->
			<div class="form-field">
				<label>
					First name
					<input [formControl]="firstNameFormControl" />
				</label>

				<div
					class="error"
					*ngIf="(ngForm.submitted || firstNameFormControl.touched) && firstNameFormControl.hasError('required')"
				>
					Please enter your first name
				</div>
			</div>

			<div class="spacer"></div>

			<!-- Last name -->
			<div class="form-field">
				<label>
					Lasy name
					<input [formControl]="lastNameFormControl" />
				</label>

				<div
					class="error"
					*ngIf="(ngForm.submitted || firstNameFormControl.touched) && lastNameFormControl.hasError('required')"
				>
					Please enter your last name
				</div>
			</div>

			<p>(keep scrolling)</p>

			<div class="spacer"></div>

			<button type="submit">Submit</button>
		</form>
	`,
	styles: [
		`
			:host {
				display: block;
				height: 200px;
				overflow-y: scroll;
				resize: vertical;
			}

			.form-field {
				padding: 16px;
				transition: background-color 250ms ease-in-out;
			}

			.highlight {
				background-color: pink;
			}

			.error {
				color: red;
			}

			.spacer {
				height: 200px;
			}
		`,
	],
})
class ScrollToErrorHostComponent {
	public readonly userForm = new FormGroup({
		firstName: new FormControl('', [Validators.required]),
		lastName: new FormControl('', [Validators.required]),
	});
	public readonly firstNameFormControl = this.userForm.get('firstName') as FormControl;
	public readonly lastNameFormControl = this.userForm.get('lastName') as FormControl;
}

export default {
	title: 'ScrollToError',
	component: ScrollToErrorHostComponent,
	decorators: [
		moduleMetadata({
			declarations: [ScrollToErrorHostComponent],
			imports: [
				ReactiveFormsModule,
				ScrollToErrorModule.withConfig({
					errorSelector: '.error',
					highlightClass: 'highlight',
					highlightTargetSelector: '.form-field',
					highlightDurationMs: 1000,
					scrollOptions: window.matchMedia('(prefers-reduced-motion)').matches ? undefined : { behavior: 'smooth' },
					focusTargetSelector: 'input',
				}),
			],
		}),
	],
} as Meta<ScrollToErrorHostComponent>;

const Template: Story<ScrollToErrorHostComponent> = (args: ScrollToErrorHostComponent) => ({
	component: ScrollToErrorHostComponent,
	props: args,
});

export const Default = Template.bind({});
Default.args = {};
