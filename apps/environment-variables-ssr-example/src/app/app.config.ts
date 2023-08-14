import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideUniversalEnvironmentVariables } from '@infinum/ngx-nuts-and-bolts-ssr';
import { EnvironmentVariablesService } from '@infinum/ngx-nuts-and-bolts/env';
import { EnvironmentVariable } from '@ngx-nuts-and-bolts/environment-variables-example-app-base';

export const appConfig: ApplicationConfig = {
	providers: [
		provideUniversalEnvironmentVariables({
			publicVariables: [EnvironmentVariable.Foo],
			privateVariables: [EnvironmentVariable.Bar], // Value for `Bar` will be `undefined` in the browser, but preset on the server.
		}),
		{
			provide: APP_INITIALIZER,
			multi: true,
			useFactory: (env: EnvironmentVariablesService<EnvironmentVariable>) => {
				return () => console.log(env.get(EnvironmentVariable.Foo));
			},
			deps: [EnvironmentVariablesService],
		},
	],
};
