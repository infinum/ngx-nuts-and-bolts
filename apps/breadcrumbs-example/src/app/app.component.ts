import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CUSTOMERS_ROUTE_PATH } from './route-param';

@Component({
	standalone: true,
	imports: [RouterModule],
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	protected readonly CUSTOMERS_ROUTE_PATH = CUSTOMERS_ROUTE_PATH;
}
