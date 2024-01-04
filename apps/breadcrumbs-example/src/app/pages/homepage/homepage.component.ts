import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CUSTOMERS_ROUTE_PATH } from '../../route-param';

@Component({
	selector: 'app-homepage',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './homepage.component.html',
	styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
	protected readonly CUSTOMERS_ROUTE_PATH = CUSTOMERS_ROUTE_PATH;
}
