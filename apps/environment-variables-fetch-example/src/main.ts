import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import appConfig from './app/app.config';

fetch('./assets/env.json')
	.then((response) => response.json())
	.then((env) => {
		bootstrapApplication(AppComponent, appConfig(env)).catch((err) => console.error(err));
	});
