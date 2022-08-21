import { Component } from '@angular/core';
import { EnvironmentVariable } from '../../enums/environment-variable.enum';

@Component({
	selector: 'ngx-nuts-and-bolts-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.scss'],
})
export class DemoComponent {
	public readonly variables = Object.entries(EnvironmentVariable);
	public selectedVariable = EnvironmentVariable.FOO;
}
