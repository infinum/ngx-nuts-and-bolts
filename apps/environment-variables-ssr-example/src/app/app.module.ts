import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { EnvironmentVariablesModule } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariablesSSRLoaderModule } from '@infinumjs/ngx-nuts-and-bolts-ssr';
import {
	AppComponent,
	EnvironmentVariable,
	EnvironmentVariableValueModule,
} from '@ngx-nuts-and-bolts/environment-variables-example-app-base';

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
	bootstrap: [AppComponent],
})
export class AppModule {}
