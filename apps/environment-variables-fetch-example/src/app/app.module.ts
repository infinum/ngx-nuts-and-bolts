/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
	EnvironmentVariablesModule,
	EnvironmentVariablesStaticLoaderModule,
	ENVIRONMENT_VARIABLES_LOADER,
} from '@infinumjs/ngx-nuts-and-bolts';
import {
	AppComponent,
	EnvironmentVariable,
	EnvironmentVariableValueModule,
} from '@ngx-nuts-and-bolts/environment-variables-example-app-base';
import { environment } from '../environments/environment';

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
		// Development mode variables
		...(environment.production
			? []
			: [
					{
						provide: ENVIRONMENT_VARIABLES_LOADER,
						useValue: {
							load: () => {
								return {
									[EnvironmentVariable.FOO]: 'I am foo (dev)',
									[EnvironmentVariable.BAR]: 'I am bar (dev)',
								};
							},
						},
					},
			  ]),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
