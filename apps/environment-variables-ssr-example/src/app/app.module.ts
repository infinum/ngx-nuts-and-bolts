import { isPlatformServer } from '@angular/common';
import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { EnvironmentVariablesModule, ENVIRONMENT_VARIABLES_LOADER } from '@infinumjs/ngx-nuts-and-bolts';
import { PROCESS } from '../injection-tokens';
import { AppComponent } from './app.component';
import { EnvironmentVariablesSSRLoader } from './services/environment-variables-ssr-loader/environment-variables-ssr-loader';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		BrowserTransferStateModule,
		EnvironmentVariablesModule.forRoot(),
	],
	providers: [
		{
			provide: PROCESS,
			useFactory: (platformId: string) => {
				if (isPlatformServer(platformId)) {
					return process;
				}

				return undefined;
			},
			deps: [PLATFORM_ID],
		},
		{
			provide: ENVIRONMENT_VARIABLES_LOADER,
			useClass: EnvironmentVariablesSSRLoader,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
