import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { applicationConfig } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { provideEnvironmentVariables } from './environment-variables.provider';
import { EnvironmentVariablesService } from './environment-variables.service';

enum EnvironmentVariable {
	Foo = 'MY_APP_FOO',
	Bar = 'MY_APP_BAR',
}

@Component({
	selector: 'inf-environment-variables-host',
	standalone: true,
	imports: [FormsModule],
	template: `
		<label>
			Select environment variable:

			<select [(ngModel)]="selectedVariable">
				@for (variable of variables; track variable[0]) {
					<option [value]="variable[1]">{{ variable[0] }} ({{ variable[1] }})</option>
				}
			</select>
		</label>

		<p>Value: {{ env.get(selectedVariable) }}</p>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class EnvironmentVariablesHostComponent {
	public readonly variables = Object.entries(EnvironmentVariable);
	public selectedVariable = EnvironmentVariable.Foo;
	public readonly env = inject(EnvironmentVariablesService<EnvironmentVariable>);
}

const meta = {
	title: 'Environment Variables',
	component: EnvironmentVariablesHostComponent,
	tags: ['autodocs'],
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
} satisfies Meta<EnvironmentVariablesHostComponent>;

export default meta;

type Story = StoryObj<EnvironmentVariablesHostComponent>;

export const Default: Story = {};
