import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'ngx-nuts-and-bolts-foo-page',
	template: 'Foo',
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
