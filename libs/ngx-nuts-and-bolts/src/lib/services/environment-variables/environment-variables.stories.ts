import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, applicationConfig } from '@storybook/angular';
import { provideEnvironmentVariables } from './environment-variables.provider';
import { EnvironmentVariablesService } from './environment-variables.service';

enum EnvironmentVariable {
	Foo = 'MY_APP_FOO',
	Bar = 'MY_APP_BAR',
}

@Component({
	selector: 'inf-environment-variables-host-component',
	standalone: true,
	imports: [CommonModule, FormsModule],
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
	title: 'Environment Variables',
	component: EnvironmentVariablesHostComponent,
	decorators: [
		applicationConfig({
			providers: [
				provideEnvironmentVariables({
					[EnvironmentVariable.Foo]: 'I am Foo',
					[EnvironmentVariable.Bar]: 'I am Bar',
				}),
			],
		}),
	],
} as Meta<EnvironmentVariablesHostComponent>;

export const Default = {
	render: (args: EnvironmentVariablesHostComponent) => ({
		props: args,
	}),
};
