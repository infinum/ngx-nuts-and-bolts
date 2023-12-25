---
id: environment-variables
title: Environment variables
sidebar_label: Environment variables
---

## 1. Introduction

Most applications that are deployed to multiple environments have a need for environment variables that can have different values, depending on which environment the app is running in.

`EnvironmentVariablesService` and the corresponding providers from `ngx-nuts-and-bolts` allow for handling of environment variables in a way that does not require application to be re-built nor to be re-deployed (only restarted in the case of SSR). This allows the same build to be deployed to multiple environments, increasing reliability and providing confidence that the codebase that was tested in pre-production environment is identical to what gets deployed to production. Additionally, this approach works well with Docker - the same Docker image containing the build can be run with different environment values for different environments.

## 2. Features

Environment variables feature set consists of two main parts - `EnvironmentVariablesService` and providers. `EnvironmentVariablesService` service is what is used in the application when you need to read some specific environment variable value. A provider is what initializes the `EnvironmentVariablesService` with actual values. Depending on project architecture, you might use the provider that is available in the library, or you might create your own provider that suits your specific needs.

## 2.1. Available variables enum

Before starting anything, it is recommended that you define a string enum that will be used for defining all the available environment variables that can be set and read.

Example:

```ts
export enum EnvironmentVariable {
	Foo = 'NGX_NUTS_AND_BOLTS_EXAMPLE_FOO',
	Bar = 'NGX_NUTS_AND_BOLTS_EXAMPLE_BAR',
}
```

This enum will be used in place of some generic values for things like `EnvironmentVariablesService`, `ENVIRONMENT_VARIABLES_RECORD` and `EnvironmentVariablesRecord`

## 2.2. `EnvironmentVariablesService`

### 2.2.1. Methods

`EnvironmentVariablesService` exposes methods like `get`, `getAsNumber` and `getAsBoolean` that allow you to read environment variable values directly, or try to convert them to a number or a boolean before returning the value. Please read JSDoc comments for more information about each of the methods.

### 2.2.2. Configuration

`EnvironmentVariablesService` can be configured by setting a value under `ENVIRONMENT_VARIABLES_CONFIG` DI token to an object that satisfies `IEnvironmentVariablesConfig` interface. You can use `provideEnvironmentVariablesServiceConfig` functional provider. The configuration object has the following properties:

- `truthyBooleanStrings` - An array of strings that will, when reading environment variable via `getAsBoolean`, be consider `true`. Before comparison, the actual value is converted to lowercase. The default value is `['true', '1']`.

This configuration is applied no matter how the environment variables values are provided (SPA or SSR).

## 2.3 Providers

`EnvironmentVariablesService` depends on variables and their values to be provided via `DI`. There are two providers that are available in the library (one for SPA and one for SSR) that should cover most use cases, and a way to create your own provider.

### 2.3.1. For SPA Apps - `provideEnvironmentVariables`

`provideEnvironmentVariables` is a simple function that receives an object and returns a provider. The passed object must have all the environment variables that are used in the application.

Intended use case for this is to fetch environment variables from a file that is bundled with the application. This is the most common use case for SPA apps and is the one that is used in the example application.

```ts title="apps/environment-variables-fetch-example/src/main.ts"
fetch('./assets/env.json')
	.then((response) => response.json())
	.then((env) => {
		platformBrowserDynamic([provideEnvironmentVariables(env)])
			.bootstrapModule(AppModule)
			.catch((err) => console.error(err));
	});
```

In `env.json`, you would have something like this:

```json title="apps/environment-variables-fetch-example/src/assets/env.json"
{
	"API_URL": "https://api.example.com"
}
```

`env.json` file should be committed and the committed values in the file should be the values you use during development.

When you deploy the app to some environment, you build the application artifacts only once and the DevOps team should implement value replacements of properties in `dist/assets/env.json` file. This replacement must happen after the build, but before the application is deployed (basically copied to production server as static files). This way, user's browser will fetch `env.json` when the app starts and use the values that are set in the file. Values can, of course, be set per-environment (that is the whole point of this feature).

### 2.3.2. For SSR / Angular Universal Apps - `provideUniversalEnvironmentVariables`

The setup for Angular Universal is similar, but there is no env.json file that is fetched. This files was necessary for SPA apps because there is no application runtime, only statically built and served files. However, with SSR, there is a runtime and we can access `process.env` to read values from system-level environment variables.

#### Providers and their configuration

There are two providers that enable use of environment variables on both the server and the client:

1. `provideUniversalEnvironmentVariables` - ensures that variables can be read on both server and the client
   - a configuration object allows you to specify which variables are public and which are private. Public variables will be transferred from server to client, while private ones will be kept only on the server
2. `provideProcess` - provides the global `process` object for use on the server

#### Module configuration

Add `provideUniversalEnvironmentVariables` to the `AppModule` (not `AppServerModule`!):

```ts
import { provideUniversalEnvironmentVariables } from '@infinum/ngx-nuts-and-bolts-ssr';
// ...

@NgModule({
	// ...
	providers: [
		// ...
		provideUniversalEnvironmentVariables({
			publicVariables: [EnvironmentVariable.Foo],
			privateVariables: [EnvironmentVariable.Bar],
		}),
	],
})
export class AppModule {}
```

Update `AppServerModule` by adding `provideProcess` provider:

```ts
import { provideProcess } from '@infinum/ngx-nuts-and-bolts-ssr';
// ...

@NgModule({
	// ...
	providers: [
		// ...
		provideProcess(),
	],
})
export class AppServerModule {}
```

#### Standalone-components configuration

If you do not use modules and use a standalone component for bootstrapping the app, you must update your application config like so:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideUniversalEnvironmentVariables } from '@infinum/ngx-nuts-and-bolts-ssr';
// ...

export const appConfig: ApplicationConfig = {
	providers: [
		// ...
		provideUniversalEnvironmentVariables({
			publicVariables: [EnvironmentVariable.Foo],
			privateVariables: [EnvironmentVariable.Bar], // Value for `Bar` will be `undefined` in the browser, but preset on the server.
		}),
	],
};
```

Next, update server application config:

```ts
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideProcess } from '@infinum/ngx-nuts-and-bolts-ssr';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
	providers: [provideServerRendering(), provideProcess()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

Please notice that the config used for bootstrapping the application on the server merges the base config with browser-specific config. To draw a comparison with the module-based approach, base config is basically what was in `AppModule` and server config is what was in `AppServerModule`.

#### Implementation details

_Implementation detail_ - [`TransferState`](https://angular.io/api/platform-browser/TransferState) is used to transfer public variables from Node to browser, while private ones are kept only on server and are not transferred to the client.

Because the node part of the app will read values from `process.env`, you must provide the global `process` object under `PROCESS` DI token. You can do so by using `provideProcess` functional provider. This is done so that `process.env` is not hard-coded in `provideUniversalEnvironmentVariables` provider, making unit testing easier.

When running the app on production server, simply set environment variables in one of the standard ways:

1. API_URL=https://api.example.com node server.js
2. export API_URL=https://api.example.com && node server.js
3. save API_URL=https://api.example.com in .env file and source it in server.ts (e.g. using [`dotenv`](https://www.npmjs.com/package/dotenv) NPM package for Node.js)

For development, you can easily define values for variables in a local .env file and source it however you like (e.g. using [`dotenv` ohmyzsh plugin](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/dotenv) or rely on [`dotenv`](https://www.npmjs.com/package/dotenv) implementation in `server.ts`);

### 2.3.3. Custom setup using `ENVIRONMENT_VARIABLES_RECORD`

This method gives you flexibility to implement a custom way of initializing environment variables record. You can provide the record containing values for environment variables yourself, by manually setting value for `ENVIRONMENT_VARIABLES_RECORD` DI token. This is what both `provideEnvironmentVariables` and `provideUniversalEnvironmentVariables` do internally.

The of the object that you provide under `ENVIRONMENT_VARIABLES_RECORD` has to satisfy `EnvironmentVariablesRecord` generic type. This type receives a generic that is the enum of your available variables.

If you do this, do not use `provideEnvironmentVariables` nor `provideUniversalEnvironmentVariables` providers.

## 3. Example applications

Please check out the source code repository for two example applications. Example applications use standalone components for bootstrapping the app, but the same principles apply to module-based apps.

### 3.1 Single-page App with fetching

[`apps/environment-variables-fetch-example`](https://github.com/infinum/ngx-nuts-and-bolts/tree/main/apps/environment-variables-fetch-example) demonstrates an example that uses `provideEnvironmentVariables` provider. In `main.ts` (before the application is loaded), `./assets/env.json` is fetched using `fetch` and the application is bootstrapped with the `provideEnvironmentVariables` provider. You can start this example with `npm run start:environment-variables-fetch-example`.

### 3.2 Angular Universal App with SSR

[`apps/environment-variables-ssr-example`](https://github.com/infinum/ngx-nuts-and-bolts/tree/main/apps/environment-variables-ssr-example) uses `provideUniversalEnvironmentVariables` provider. The application has to be started with environment variables exposed to the node process that is running the SSR app. You can start this example with `npm run start:environment-variables-ssr-example`.

For this example, `Foo` variable is set as public, and `Bar` is set as private. That is why you don't see value for `Bar` in the browser, but you will see it in the console of the node process.

## 4. Unit testing

For unit testing, simply call `provideEnvironmentVariables` with desired values for that specific test suite and `EnvironmentVariablesService` will use those values. You do not have to provide `EnvironmentVariablesService` explicitly, as it has `providedIn: 'root'`. `TestBed` configuration example:

```ts
TestBed.configureTestingModule({
	providers: [
		provideEnvironmentVariables({
			[EnvironmentVariable.Foo]: 'I am Foo (testing)',
			[EnvironmentVariable.Bar]: 'I am Bar (testing)',
		}),
	],
});

envService = TestBed.inject(EnvironmentVariablesService);
```

## 5. Opinion piece - what about Angular's `environment` files?

While Angular provides environment files out-of-the-box (one for development and one for production), but they are not the best solution to this problem for multiple reasons:

- Any changes to these files require application re-build and re-deployment
- Adding a new requirement requires code changes
- One build per environment
  - At best, this is sub-optimal
  - At worst, it can lead to situations where you think that the builds for different environments were made from the same commit, but something might have been pushed in the meantime and the builds will be different
- One file is required for each environment
- A configuration entry has to be added to `angular.json` for each file
- Conceptually, the frontend repository should not care about any URLs or other values that are related to the deployment process - they should be stored in the deployment pipeline
  - The only thing that is OK to keep in the frontend repository are URLs for development proxies
- Some projects have a CI/CD setup such that each branch gets deployed to some unique environment so that the application is available online as part of pull request and design review processes. This is basically impossible to do with environment files without some hacky file copying and/or search-and-replace of some placeholder values

Although these out-of-the-box files are named `environment.ts` and `environment.prod.ts`, Angular CLI has refers to these files in the `configurations` segment of `angular.json`. Basically, there is a 1-to-1 mapping between build configurations in `angular.json` and `environment.ts` files. `configurations` would probably be a more suitable name because these files are not the best fit for defining environment-specific values likeAPI URL, for all the reasons mentioned before. The main purpose for these files should be to define differences in build configurations - think of them as pragmas. Out-of-the-box they are used to determine whether Angular should run in production or development mode. Similar to the out-of-the-box `production` boolean property, you might have some custom properties that are used, for example, to determine if something should be logged or not in different build configurations.

Even though one of the configurations is called `production` and the other `development`, these are usually the only two configurations you actually need. In environments where it is important to provide a optimized build to the end-user, use `production` configuration. In environments where it is important that you can easily debug the deployed code, use `development` configuration. Even if you have many different environments, you are probably still ok with using one of these two configurations in each of the environments (e.g. `production` configuration for production and pre-production environments and `development` for development environments). You might want to add one additional middle-ground configuration that has all the optimizations enabled, but also includes sourcemaps that can be used to help with debugging. Basically `production` configuration + sourcemaps on top.

We can only hope that one day Angular CLI completely drops `environment` from naming and starts calling these files `configuration` files (e.g. `configuration.dev.ts`, `configuration.prod.ts`). This would better convey use cases where these files are a good fit. Environment variables should be kept out of these files in most applications. If you think these files will work for your use case, feel free to use them. However, we believe that they are not a good fit for anything other than some really small-scale and/or demo projects.

As a final nail in the coffin for developers defaulting to using `environment` files for things like API_URL, [Angular CLI removed generation of these files for new projects in version 15](https://github.com/angular/angular-cli/commit/283b564d1de985f0af8c2fcb6192801a90baacda). You can still enable them after the project is generated, but it is no longer there by default and the usage of these files is discouraged for anything other than defining differences in build configurations (e.g. build with MSW handlers or without).
