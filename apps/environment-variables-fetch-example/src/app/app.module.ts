/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
	EnvironmentVariablesModule,
	EnvironmentVariablesStaticLoaderModule,
	ENVIRONMENT_VARIABLES_STATIC_LOADER_CONFIG,
} from '@infinumjs/ngx-nuts-and-bolts';
import {
	AppComponent,
	EnvironmentVariableValueModule,
} from '@ngx-nuts-and-bolts/environment-variables-example-app-base';
import { WINDOW } from './injection-tokens';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		EnvironmentVariableValueModule,
		EnvironmentVariablesModule,
		EnvironmentVariablesStaticLoaderModule,
	],
	providers: [
		{
			provide: ENVIRONMENT_VARIABLES_STATIC_LOADER_CONFIG,
			useFactory: (window: Window) => {
				return {
					environmentVariablesRecord: window.env,
				};
			},
			deps: [WINDOW],
		},
		{
			provide: WINDOW,
			useValue: window,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
