import { Pipe, PipeTransform } from '@angular/core';
import { EnvironmentVariablesService } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariable } from '../../enums/environment-variable.enum';

@Pipe({
	name: 'environmentVariableValue',
})
export class EnvironmentVariableValuePipe implements PipeTransform {
	constructor(private readonly env: EnvironmentVariablesService<EnvironmentVariable>) {}

	public transform(variable: EnvironmentVariable): string | undefined {
		return this.env.get(variable);
	}
}
