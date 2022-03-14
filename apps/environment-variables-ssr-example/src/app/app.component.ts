import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EnvironmentVariablesService } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariable } from './enums/environment-variable.enum';

export interface IVariables {
	variableEnumKey: string;
	variableName: string;
	variableValue: string | undefined;
}

@Component({
	selector: 'ngx-nuts-and-bolts-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	public readonly variables: Array<IVariables>;

	constructor(private readonly env: EnvironmentVariablesService<EnvironmentVariable>) {
		this.variables = Object.entries(EnvironmentVariable).reduce((variables, [variableEnumKey, variableName]) => {
			variables.push({
				variableEnumKey,
				variableName,
				variableValue: this.env.get(variableName),
			});
			return variables;
		}, [] as Array<IVariables>);
	}
}
