import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { EnvironmentVariablesModule, ENVIRONMENT_VARIABLES_LOADER } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariablesSSRLoaderModule } from '@infinumjs/ngx-nuts-and-bolts-ssr';
import {
	AppComponent,
	EnvironmentVariable,
	EnvironmentVariableValueModule,
} from '@ngx-nuts-and-bolts/environment-variables-example-app-base';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),

		BrowserTransferStateModule,

		EnvironmentVariablesModule,
		EnvironmentVariablesSSRLoaderModule.withConfig({
			variablesToLoad: Object.values(EnvironmentVariable),
		}),

		FormsModule,
		EnvironmentVariableValueModule,
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
