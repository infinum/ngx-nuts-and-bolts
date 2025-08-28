import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'inf-nuts-and-bolts-foo-page',
	template: 'Foo',
	standalone: false,
})
export class FooPageComponent {}

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				component: FooPageComponent,
			},
		]),
	],
})
export class FooPageModule {}
