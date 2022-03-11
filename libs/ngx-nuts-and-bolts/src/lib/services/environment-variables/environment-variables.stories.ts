import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ENVIRONMENT_VARIABLES_LOADER } from './environment-variables-loader.interface';
import { EnvironmentVariablesModule } from './environment-variables.module';
import { EnvironmentVariablesService } from './environment-variables.service';

enum EnvironmentVariable {
	FOO = 'MY_APP_FOO',
	BAR = 'MY_APP_BAR',
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
class EnvironmentVariablesHostComponent implements OnDestroy {
	public readonly variables = Object.entries(EnvironmentVariable);
	public selectedVariable = EnvironmentVariable.FOO;

	constructor(public readonly env: EnvironmentVariablesService<EnvironmentVariable>) {}

	public ngOnDestroy(): void {
		// You don't need to do this in your app, it's needed only for Stroybook because
		// in Storybook the the module will be initialized multiple times using .forRoot()
		EnvironmentVariablesModule['initialized'] = false;
	}
}

export default {
	title: 'EnvironmentVariables',
	component: EnvironmentVariablesHostComponent,
	decorators: [
		moduleMetadata({
			declarations: [EnvironmentVariablesHostComponent],
			imports: [FormsModule, EnvironmentVariablesModule.forRoot()],
			providers: [
				{
					provide: ENVIRONMENT_VARIABLES_LOADER,
					useValue: {
						load: () => ({
							[EnvironmentVariable.FOO]: 'I am foo',
							[EnvironmentVariable.BAR]: 'I am bar',
						}),
					},
				},
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
