import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EnvironmentVariablesRecord, EnvironmentVariablesService } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariable } from './enums/environment-variable.enum';

@Component({
	selector: 'ngx-nuts-and-bolts-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	public readonly variables: EnvironmentVariablesRecord<EnvironmentVariable>;

	constructor(private readonly env: EnvironmentVariablesService<EnvironmentVariable>) {
		this.variables = (Object.values(EnvironmentVariable) as Array<EnvironmentVariable>).reduce((record, variable) => {
			record[variable] = this.env.get(variable);
			return record;
		}, {} as EnvironmentVariablesRecord<EnvironmentVariable>);
	}
}
