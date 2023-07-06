import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { EnvironmentVariablesService, provideEnvironmentVariables } from '@infinum/ngx-nuts-and-bolts';
import { EnvironmentVariable } from '@ngx-nuts-and-bolts/environment-variables-example-app-base';

function appConfig(env: Record<EnvironmentVariable, string>): ApplicationConfig {
	return {
		providers: [
			provideEnvironmentVariables(env),
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
