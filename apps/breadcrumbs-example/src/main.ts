import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { startMsw } from './mocks';

startMsw(); // You would usually get API_URL env.var. and pass the value to startMsw, but for the sake of simplicity we're passing an empty string in this example.

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
