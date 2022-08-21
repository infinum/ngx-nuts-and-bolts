import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import { EnvironmentVariableValueModule } from '../../pipes/environment-variable-value/environment-variable-value.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [DemoComponent],
	imports: [CommonModule, EnvironmentVariableValueModule, FormsModule],
	exports: [DemoComponent],
})
export class DemoModule {}
