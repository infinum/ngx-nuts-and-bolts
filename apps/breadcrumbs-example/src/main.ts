import { bootstrapApplication } from '@angular/platform-browser';
import { customerHandlerFactories, initMockCustomers } from 'breadcrumbs-testbed';
import { setupWorker } from 'msw/browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

function startMsw(apiUrl = '') {
	initMockCustomers();

	const handlers = [...customerHandlerFactories].map((factory) => factory(apiUrl));

	const worker = setupWorker(...handlers);

	return worker.start({ onUnhandledRequest: 'bypass' });
}

startMsw();

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
