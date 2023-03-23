/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EnvironmentVariablesService } from '@infinumjs/ngx-nuts-and-bolts';
import {
	AppComponent,
	EnvironmentVariable,
	EnvironmentVariableValueModule,
} from '@ngx-nuts-and-bolts/environment-variables-example-app-base';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, FormsModule, HttpClientModule, EnvironmentVariableValueModule],
	providers: [
		{
			provide: APP_INITIALIZER,
			multi: true,
			useFactory: (env: EnvironmentVariablesService<EnvironmentVariable>) => {
				return () => console.log(env.get(EnvironmentVariable.Foo));
			},
			deps: [EnvironmentVariablesService],
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
