import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserveResizeDirective } from './observe-resize.directive';

@NgModule({
	declarations: [ObserveResizeDirective],
	imports: [CommonModule],
	exports: [ObserveResizeDirective],
})
export class ObserveResizeModule {}
