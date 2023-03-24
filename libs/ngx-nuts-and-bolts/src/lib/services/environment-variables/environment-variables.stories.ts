import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { provideEnvironmentVariables } from './environment-variables.provider';
import { EnvironmentVariablesService } from './environment-variables.service';

enum EnvironmentVariable {
	Foo = 'MY_APP_FOO',
	Bar = 'MY_APP_BAR',
}

@Component({
	selector: 'inf-environment-variables-host-component',
	template: `
		<label>
			Select environment variable:

			<select [(ngModel)]="selectedVariable">
				<option *ngFor="let variable of variables" [value]="variable[1]">{{ variable[0] }} ({{ variable[1] }})</option>
			</select>
		</label>

		<p>Value: {{ env.get(selectedVariable) }}</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class EnvironmentVariablesHostComponent {
	public readonly variables = Object.entries(EnvironmentVariable);
	public selectedVariable = EnvironmentVariable.Foo;

	constructor(public readonly env: EnvironmentVariablesService<EnvironmentVariable>) {}
}

export default {
	title: 'EnvironmentVariables',
	component: EnvironmentVariablesHostComponent,
	decorators: [
		moduleMetadata({
			declarations: [EnvironmentVariablesHostComponent],
			imports: [FormsModule],
			providers: [
				provideEnvironmentVariables({
					[EnvironmentVariable.Foo]: 'I am Foo',
					[EnvironmentVariable.Bar]: 'I am Bar',
				}),
			],
		}),
	],
} as Meta<EnvironmentVariablesHostComponent>;

const Template: Story<EnvironmentVariablesHostComponent> = (args: EnvironmentVariablesHostComponent) => ({
	component: EnvironmentVariablesHostComponent,
	props: args,
});

export const Default = Template.bind({});
Default.args = {};
