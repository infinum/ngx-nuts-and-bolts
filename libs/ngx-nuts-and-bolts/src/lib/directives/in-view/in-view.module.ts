/* istanbul ignore file */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InViewDirective } from './in-view.directive';

@NgModule({
	declarations: [InViewDirective],
	imports: [CommonModule],
	exports: [InViewDirective],
})
export class InViewModule {}
