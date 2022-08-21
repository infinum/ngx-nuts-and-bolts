/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
	EnvironmentVariablesModule,
	EnvironmentVariablesStaticLoaderModule,
	ENVIRONMENT_VARIABLES_LOADER,
} from '@infinumjs/ngx-nuts-and-bolts';
import { DemoModule, EnvironmentVariable } from '@ngx-nuts-and-bolts/environment-variables-example-app-base';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,

		DemoModule,

		EnvironmentVariablesModule,
		EnvironmentVariablesStaticLoaderModule,
	],
	providers: [
		// User initializer
		{
			provide: APP_INITIALIZER,
			useFactory: (authService: AuthService) => {
				return () => authService.init();
			},
			deps: [AuthService],
		},

		// Development mode variables (optional)
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
									[EnvironmentVariable.API_URL]: 'http://localhost:4200/assets',
								};
							},
						},
					},
			  ]),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
