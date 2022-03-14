/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EnvironmentVariableValueModule } from '../../../environment-variables-ssr-example/src/app/pipes/environment-variable-value/environment-variable-value.module';
import { AppComponent } from '../../../environment-variables-ssr-example/src/app/app.component';
import { EnvironmentVariablesModule, ENVIRONMENT_VARIABLES_LOADER } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariablesFetchLoader } from './services/environment-variables-fetch-loader';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		EnvironmentVariableValueModule,
		EnvironmentVariablesModule.forRoot(),
	],
	providers: [
		{
			provide: ENVIRONMENT_VARIABLES_LOADER,
			useClass: EnvironmentVariablesFetchLoader,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
