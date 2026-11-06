import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { provideProcess } from '@infinum/ngx-nuts-and-bolts-ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
	providers: [provideServerRendering(withRoutes(serverRoutes)), provideProcess()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
