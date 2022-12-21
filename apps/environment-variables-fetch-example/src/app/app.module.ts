/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
	EnvironmentVariablesModule,
	EnvironmentVariablesService,
	ENVIRONMENT_VARIABLES_RECORD,
} from '@infinumjs/ngx-nuts-and-bolts';
import {
	AppComponent,
	EnvironmentVariable,
	EnvironmentVariableValueModule,
} from '@ngx-nuts-and-bolts/environment-variables-example-app-base';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, FormsModule, HttpClientModule, EnvironmentVariableValueModule, EnvironmentVariablesModule],
	providers: [
		{
			provide: APP_INITIALIZER,
			multi: true,
			useFactory: (env: EnvironmentVariablesService<EnvironmentVariable>) => {
				return () => console.log(env.get(EnvironmentVariable.FOO));
			},
			deps: [EnvironmentVariablesService],
		},
		// Development mode variables
		...(environment.production
			? []
			: [
					{
						provide: ENVIRONMENT_VARIABLES_RECORD,
						useValue: {
							[EnvironmentVariable.FOO]: 'I am foo (dev)',
							[EnvironmentVariable.BAR]: 'I am bar (dev)',
						},
					},
			  ]),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
