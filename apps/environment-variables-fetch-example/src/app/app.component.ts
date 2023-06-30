import { Component } from '@angular/core';
import { VariableSelectionComponent } from '@ngx-nuts-and-bolts/environment-variables-example-app-base';

@Component({
	standalone: true,
	imports: [VariableSelectionComponent],
	selector: 'ngx-root',
	templateUrl: './app.component.html',
})
export class AppComponent {}
