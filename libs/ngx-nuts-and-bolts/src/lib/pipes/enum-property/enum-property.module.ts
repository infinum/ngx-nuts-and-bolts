/* istanbul ignore file */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EnumPropertyPipe } from './enum-property.pipe';

@NgModule({
	declarations: [EnumPropertyPipe],
	exports: [EnumPropertyPipe],
	imports: [CommonModule],
})
export class EnumPropertyModule {}
