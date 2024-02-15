import { bootstrapApplication } from '@angular/platform-browser';
import { EnvironmentVariable } from '@ngx-nuts-and-bolts/environment-variables-example-app-base';
import { AppComponent } from './app/app.component';
import appConfig from './app/app.config';

fetch('./assets/env.json')
	.then((response) => response.json())
	.then((env: Record<EnvironmentVariable, string>) => {
		bootstrapApplication(AppComponent, appConfig(env)).catch((err) => console.error(err));
	})
	.catch((e) => {
		console.error(e);
		throw e;
	});
