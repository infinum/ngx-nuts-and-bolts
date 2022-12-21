/* istanbul ignore file */

import { NgModule } from '@angular/core';
import { EnvironmentVariablesService } from './environment-variables.service';

@NgModule({
	providers: [EnvironmentVariablesService],
})
export class EnvironmentVariablesModule {}
