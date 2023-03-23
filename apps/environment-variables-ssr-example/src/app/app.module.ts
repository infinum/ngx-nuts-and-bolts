import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { provideUniversalEnvironmentVariables } from '@infinumjs/ngx-nuts-and-bolts-ssr';
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

		FormsModule,
		EnvironmentVariableValueModule,
	],
	providers: [
		provideUniversalEnvironmentVariables({
			publicVariables: [EnvironmentVariable.FOO],
			privateVariables: [EnvironmentVariable.BAR],
		}),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
