import { NgModule } from '@angular/core';
import { EnvironmentVariableValuePipe } from './environment-variable-value.pipe';

@NgModule({
	declarations: [EnvironmentVariableValuePipe],
	exports: [EnvironmentVariableValuePipe],
})
export class EnvironmentVariableValueModule {}
