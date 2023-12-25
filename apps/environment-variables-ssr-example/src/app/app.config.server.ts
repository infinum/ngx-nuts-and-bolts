import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideProcess } from '@infinum/ngx-nuts-and-bolts-ssr';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
	providers: [provideServerRendering(), provideProcess()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
