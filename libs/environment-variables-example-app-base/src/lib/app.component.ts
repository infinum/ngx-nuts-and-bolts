import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EnvironmentVariable } from './enums/environment-variable.enum';

@Component({
	selector: 'ngx-nuts-and-bolts-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	public readonly variables = Object.entries(EnvironmentVariable);
	public selectedVariable = EnvironmentVariable.FOO;
}
