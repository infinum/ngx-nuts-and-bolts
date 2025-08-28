import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { EnvironmentVariablesService, provideEnvironmentVariables } from '@infinum/ngx-nuts-and-bolts/env';
import { EnvironmentVariable, envExampleAppRoutes } from '@ngx-nuts-and-bolts/environment-variables-example-app-base';

function appConfig(env: Record<EnvironmentVariable, string>): ApplicationConfig {
	return {
		providers: [
			provideEnvironmentVariables(env),
			provideRouter(envExampleAppRoutes),
			provideAppInitializer(() => {
				const initializerFn = ((env: EnvironmentVariablesService<EnvironmentVariable>) => {
					return () => console.log(env.get(EnvironmentVariable.Foo));
				})(inject(EnvironmentVariablesService));
				return initializerFn();
			}),
		],
	};
}

export default appConfig;
