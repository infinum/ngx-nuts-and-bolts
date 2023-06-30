import { inject, Pipe, PipeTransform } from '@angular/core';
import { EnvironmentVariablesService } from '@infinum/ngx-nuts-and-bolts';
import { EnvironmentVariable } from '../../enums/environment-variable.enum';

@Pipe({
	name: 'environmentVariableValue',
	standalone: true,
})
export class EnvironmentVariableValuePipe implements PipeTransform {
	private readonly env = inject<EnvironmentVariablesService<EnvironmentVariable>>(EnvironmentVariablesService);

	public transform(variable: EnvironmentVariable): string | undefined {
		return this.env.get(variable);
	}
}
