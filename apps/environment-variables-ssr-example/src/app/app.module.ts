import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { EnvironmentVariablesModule, ENVIRONMENT_VARIABLES_LOADER } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariablesSSRLoaderModule } from '@infinumjs/ngx-nuts-and-bolts-ssr';
import { DemoModule, EnvironmentVariable } from '@ngx-nuts-and-bolts/environment-variables-example-app-base';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		BrowserTransferStateModule,
		HttpClientModule,

		DemoModule,

		EnvironmentVariablesModule,
		EnvironmentVariablesSSRLoaderModule.withConfig({
			variablesToLoad: Object.values(EnvironmentVariable),
		}),
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
								};
							},
						},
					},
			  ]),
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
