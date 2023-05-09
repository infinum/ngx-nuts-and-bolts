import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PROCESS, provideUniversalEnvironmentVariables } from '@infinum/ngx-nuts-and-bolts-ssr';
import {
	AppComponent,
	EnvironmentVariable,
	EnvironmentVariableValueModule,
	routes,
} from '@ngx-nuts-and-bolts/environment-variables-example-app-base';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),

		BrowserTransferStateModule,

		RouterModule.forRoot(routes, { enableTracing: true }),

		FormsModule,
		EnvironmentVariableValueModule,
	],
	providers: [
		{
			provide: PROCESS,
			useValue: process,
		},
		provideUniversalEnvironmentVariables({
			publicVariables: [EnvironmentVariable.Foo],
			privateVariables: [EnvironmentVariable.Bar],
		}),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
