import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserveResizeTestingDirective } from './observe-resize.testing.directive';

@NgModule({
	declarations: [ObserveResizeTestingDirective],
	imports: [CommonModule],
	exports: [ObserveResizeTestingDirective],
})
export class ObserveResizeTestingModule {}
