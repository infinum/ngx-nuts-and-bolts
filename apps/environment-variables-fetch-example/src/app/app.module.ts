/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EnvironmentVariablesModule, ENVIRONMENT_VARIABLES_LOADER } from '@infinumjs/ngx-nuts-and-bolts';
import {
	AppComponent,
	EnvironmentVariableValueModule,
} from '@ngx-nuts-and-bolts/environment-variables-example-app-base';
import { EnvironmentVariablesFetchLoader } from './services/environment-variables-fetch-loader';

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
