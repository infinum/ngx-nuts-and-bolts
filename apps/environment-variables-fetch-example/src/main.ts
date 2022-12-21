import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ENVIRONMENT_VARIABLES_RECORD } from '@infinumjs/ngx-nuts-and-bolts';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
	enableProdMode();
}

fetch('./assets/env.json')
	.then((response) => response.json())
	.then((env) => {
		platformBrowserDynamic([
			{
				provide: ENVIRONMENT_VARIABLES_RECORD,
				useValue: env,
			},
		])
			.bootstrapModule(AppModule)
			.catch((err) => console.error(err));
	});
