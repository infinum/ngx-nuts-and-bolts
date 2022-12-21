import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ENVIRONMENT_VARIABLES_RECORD } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariable } from '@ngx-nuts-and-bolts/environment-variables-example-app-base';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
	enableProdMode();
}

function bootstrap() {
	platformBrowserDynamic([
		{
			provide: ENVIRONMENT_VARIABLES_RECORD,
			useValue: {
				[EnvironmentVariable.FOO]: process.env.FOO,
				[EnvironmentVariable.BAR]: process.env.BAR,
			},
		},
	])
		.bootstrapModule(AppModule)
		.catch((err) => console.error(err));
}

if (document.readyState === 'complete') {
	bootstrap();
} else {
	document.addEventListener('DOMContentLoaded', bootstrap);
}
