import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideUniversalEnvironmentVariables } from '@infinum/ngx-nuts-and-bolts-ssr';
import { EnvironmentVariablesService } from '@infinum/ngx-nuts-and-bolts/env';
import { EnvironmentVariable, envExampleAppRoutes } from '@ngx-nuts-and-bolts/environment-variables-example-app-base';

export const appConfig: ApplicationConfig = {
	providers: [
		provideUniversalEnvironmentVariables({
			publicVariables: [EnvironmentVariable.Foo],
			privateVariables: [EnvironmentVariable.Bar], // Value for `Bar` will be `undefined` in the browser, but preset on the server.
		}),
		provideRouter(envExampleAppRoutes),
		provideAppInitializer(() => {
			const initializerFn = ((env: EnvironmentVariablesService<EnvironmentVariable>) => {
				return () => console.log(env.get(EnvironmentVariable.Foo));
			})(inject(EnvironmentVariablesService));
			return initializerFn();
		}),
	],
};
