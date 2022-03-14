import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { EnvironmentVariablesModule } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariablesSSRLoaderModule } from '@infinumjs/ngx-nuts-and-bolts-ssr';
import { AppComponent } from './app.component';
import { EnvironmentVariable } from './enums/environment-variable.enum';
import { EnvironmentVariableValueModule } from './pipes/environment-variable-value/environment-variable-value.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),

		BrowserTransferStateModule,

		EnvironmentVariablesModule.forRoot(),
		EnvironmentVariablesSSRLoaderModule.forRoot({
			variablesToLoad: Object.values(EnvironmentVariable),
		}),

		FormsModule,
		EnvironmentVariableValueModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
