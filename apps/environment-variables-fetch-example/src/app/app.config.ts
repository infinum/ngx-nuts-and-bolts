import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { EnvironmentVariablesService, provideEnvironmentVariables } from '@infinum/ngx-nuts-and-bolts/env';
import { EnvironmentVariable, envExampleAppRoutes } from '@ngx-nuts-and-bolts/environment-variables-example-app-base';

function appConfig(env: Record<EnvironmentVariable, string>): ApplicationConfig {
	return {
		providers: [
			provideEnvironmentVariables(env),
			provideRouter(envExampleAppRoutes),
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
}

export default appConfig;
