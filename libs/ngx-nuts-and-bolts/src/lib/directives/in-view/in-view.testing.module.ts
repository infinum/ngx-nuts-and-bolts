import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewTestingDirective } from './in-view.testing.directive';

@NgModule({
	declarations: [InViewTestingDirective],
	imports: [CommonModule],
	exports: [InViewTestingDirective],
})
export class InViewTestingModule {}
