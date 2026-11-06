/* istanbul ignore file */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EnvironmentVariablesService } from '@infinum/ngx-nuts-and-bolts/env';
import { createRouteConfigLoadingObservable } from '@infinum/ngx-nuts-and-bolts/routing-utils';
import { EnvironmentVariable } from './enums/environment-variable.enum';
import { EnvironmentVariableValuePipe } from './pipes/environment-variable-value/environment-variable-value.pipe';

@Component({
	selector: 'inf-variable-selection',
	templateUrl: './variable-selection.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, EnvironmentVariableValuePipe, FormsModule, RouterModule],
})
export class VariableSelectionComponent {
	public readonly variables = Object.entries(EnvironmentVariable);
	public selectedVariable = EnvironmentVariable.Foo;
	private readonly router = inject(Router);
	public readonly isRouteConfigLoading$ = createRouteConfigLoadingObservable(this.router);
	private readonly env = inject(EnvironmentVariablesService<EnvironmentVariable>);

	constructor() {
		for (const variableName of Object.values(EnvironmentVariable)) {
			console.log(variableName, this.env.get(variableName));
		}
	}
}
