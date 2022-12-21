import { ChangeDetectionStrategy, Component, Inject, InjectionToken, Optional } from '@angular/core';
import { EnvironmentVariable } from './enums/environment-variable.enum';

export const FOO = new InjectionToken<string>('FOO');

@Component({
	selector: 'ngx-nuts-and-bolts-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	public readonly variables = Object.entries(EnvironmentVariable);
	public selectedVariable = EnvironmentVariable.FOO;

	constructor(@Optional() @Inject(FOO) public readonly foo?: string) {
		console.log(foo);
	}
}
