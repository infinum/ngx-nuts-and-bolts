/* istanbul ignore file */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EnvironmentVariablesService } from '@infinum/ngx-nuts-and-bolts';
import { EnvironmentVariable } from './enums/environment-variable.enum';

@Component({
	selector: 'ngx-nuts-and-bolts-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	public readonly variables = Object.entries(EnvironmentVariable);
	public selectedVariable = EnvironmentVariable.Foo;

	constructor(private readonly env: EnvironmentVariablesService<EnvironmentVariable>) {
		for (const variableName of Object.values(EnvironmentVariable)) {
			console.log(variableName, this.env.get(variableName));
		}
	}
}
