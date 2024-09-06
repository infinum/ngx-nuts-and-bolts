import { NgModule } from '@angular/core';
import { OverflowCheckContainerDirective } from './directives/overflow-check-container.directive';
import { OverflowCheckDirective } from './directives/overflow-check.directive';

@NgModule({
	imports: [OverflowCheckDirective, OverflowCheckContainerDirective],
	exports: [OverflowCheckDirective, OverflowCheckContainerDirective],
})
export class OverflowCheckModule {}
