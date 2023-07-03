/* istanbul ignore file */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnvironmentVariablesService } from '@infinum/ngx-nuts-and-bolts';
import { EnvironmentVariable } from './enums/environment-variable.enum';
import { EnvironmentVariableValuePipe } from './pipes/environment-variable-value/environment-variable-value.pipe';

@Component({
	selector: 'inf-variable-selection',
	templateUrl: './variable-selection.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule, EnvironmentVariableValuePipe, FormsModule],
})
export class VariableSelectionComponent {
	public readonly variables = Object.entries(EnvironmentVariable);
	public selectedVariable = EnvironmentVariable.Foo;

	constructor(private readonly env: EnvironmentVariablesService<EnvironmentVariable>) {
		for (const variableName of Object.values(EnvironmentVariable)) {
			console.log(variableName, this.env.get(variableName));
		}
	}
}
