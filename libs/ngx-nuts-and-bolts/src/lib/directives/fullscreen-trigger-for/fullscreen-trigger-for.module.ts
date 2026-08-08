import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullscreenTriggerForDirective } from './fullscreen-trigger-for.directive';



@NgModule({
  declarations: [
    FullscreenTriggerForDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullscreenTriggerForDirective
  ],
})
export class FullscreenTriggerForModule { }
