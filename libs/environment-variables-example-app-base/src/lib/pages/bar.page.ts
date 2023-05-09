import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'ngx-nuts-and-bolts-bar-page',
	template: 'Bar',
})
export class BarPageComponent {}

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: BarPageComponent,
			},
		]),
	],
})
export class BarPageModule {}
