---
id: environment-variables
title: Environment variables
sidebar_label: Environment variables
---

Most applications that are deployed to multiple environments have a need for environment variables that can have different values, depending on which environment the app is running in. `EnvironmentVariablesService` and the corresponding modules from `ngx-nuts-and-bolts` allow for handling of environment variables in a way that does not require application to be re-built nor to be re-deployed (only restarted in the case of SSR). This allows the same build to be deployed to multiple environments, increasing reliability and providing confidence that the codebase that was tested in pre-production environment is identical to what gets deployed to production. Additionally, this approach works well with Docker - the same Docker image containing the build can be run with different environment values for different environments.

## 1. Features

Environment variables feature set consists of two main parts - `EnvironmentVariablesService` and a loader. `EnvironmentVariablesService` service is what is used in the application when you need to read some specific environment variable value. A loader is what initializes the `EnvironmentVariablesService` with actual values. Depending on project architecture, you might use one of two loaders that are provided with the library. If you seek something more specific, you can implement a custom loader.

### 1.1. Main service and module

`EnvironmentVariablesService` is provided by `EnvironmentVariablesModule`. This module also provides an `APP_INITIALIZER` that uses the loader of you choice to initialize the service during application initialization.

`init` method is intentionally available publicly and can be called multiple times in order not to restrict the users in whatever use cases they might have. If you use a loader, you probably will not have to call it from your application code (not even once), but it is available if you have the need for it.

### 1.2. Loaders

The two available loaders are `EnvironmentVariablesSSRLoader` and `EnvironmentVariablesStaticLoader`.

#### SSR loader

As the name suggests, `EnvironmentVariablesSSRLoader` is to be used with Angular Universal (Server-Side Rendering) applications. It reads from `process.env` on server-side and transfers the values to the client browser using the `TransferState` service.

This is the recommended loader if you use SSR, although you can still use any other loader if there is a specific need.

Please note that this loader is part of a separate NPM package (`@infinumjs/ngx-nuts-and-bolts-ssr`) because of `node` dependency. This keeps the main NPM package (`@infinumjs/ngx-nuts-and-bolts`) free of any node dependencies.

#### Static loader

The main use case for `EnvironmentVariablesStaticLoader` is for statically built applications that do not use SSR.

Any custom loaders you might need to implement are injectable classes that implement `IEnvironmentVariablesLoader`. Please check out the source code of the two available loaders for some examples.

### 1.3. Race conditions during application initialization

Because all the `APP_INITIALIZER`s start being resolved at the same time, there is no guarantee in which order they will be resolved. This can cause issues if you have an asynchronous environment variables loader and you need to use `EnvironmentVariablesService` within some other `APP_INITIALIZER`s - it could happen that `EnvironmentVariablesService` is not initialized in time.

As a workaround for such cases, other initializers can await for `EnvironmentVariablesService`'s `initDone$` observable to emit `true`.

`EnvironmentVariablesSSRLoader` and `EnvironmentVariablesStaticLoader` loaders that are provided with the library are not affected by this issue, but some custom loaders that are written for specific application needs might be.

## 2. Usage and example applications

Please follow these steps to set up the environment variables service and loaders:

1. Define a string enum that defines all the needed environment variables

   Example enum:

   ```ts
   export enum EnvironmentVariable {
   	FOO = 'NGX_NUTS_AND_BOLTS_EXAMPLE_FOO',
   	BAR = 'NGX_NUTS_AND_BOLTS_EXAMPLE_BAR',
   }
   ```

2. Import `EnvironmentVariablesModule` into your `AppModule`
3. Import an existing loader module or provide a custom loader (also in `AppModule`)
4. Inject `EnvironmentVariablesService` and call `get` method wherever you need some environment variable value

### 2.1. Configuring static loader

Import `EnvironmentVariablesStaticLoaderModule` with or without config.

#### With config

This option will use fully static values that are defined when the module is imported. This can be useful for setting environment variables in development of if you are reading them from `window.env` or similar.

Some examples:

```ts
@NgModule({
	imports: [
		EnvironmentVariablesModule,
		EnvironmentVariablesStaticLoaderModule.withConfig({
			environmentVariablesRecord: {
				[EnvironmentVariable.FOO]: 'I am Foo',
				[EnvironmentVariable.BAR]: 'I am Bar',
			},
		}),
	],
})
export class AppModule {}
```

```ts
@NgModule({
	imports: [
		EnvironmentVariablesModule,
		EnvironmentVariablesStaticLoaderModule.withConfig({
			environmentVariablesRecord: window.env,
		}),
	],
})
export class AppModule {}
```

#### Without config

If the module is imported without calling `withConfig`, you need to provide the config manually. An example:

```ts
@NgModule({
	imports: [EnvironmentVariablesModule, EnvironmentVariablesStaticLoaderModule],
	providers: [
		{
			provide: ENVIRONMENT_VARIABLES_STATIC_LOADER_CONFIG,
			useFactory: (window: Window) => {
				return {
					environmentVariablesRecord: window.env,
				};
			},
			deps: [WINDOW],
		},
		{
			provide: WINDOW,
			useValue: window,
		},
	],
})
export class AppModule {}
```

This example is functionally the same as `EnvironmentVariablesStaticLoaderModule.withConfig` example where window.env was used directly (without injection token). Generally, it is a good practice to hide globals behind injection tokens and your app might already have an injection token for `Window` because you are using something else from `Window` as well. The example above shows how to use that injection token when configuring `EnvironmentVariablesStaticLoader`.

### 2.2. Configuring SSR loader

Before using `EnvironmentVariablesSSRLoader`, make sure that `BrowserTransferStateModule` is imported, because `EnvironmentVariablesSSRLoader` depends on `TransferState`.

There can be many different environment variables present on the server where your Angular Universal application is running. `EnvironmentVariablesSSRLoader` has to be configured with information about which variables should be read from `process.env`. Be careful not to expose any secrets to the browser (e.g. various tokens/keys that are present in `process.env`). This can be done as shown in this example:

```ts
@NgModule({
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		BrowserTransferStateModule,

		EnvironmentVariablesModule,
		EnvironmentVariablesSSRLoaderModule.withConfig({
			variablesToLoad: [EnvironmentVariable.FOO, EnvironmentVariable.BAR],
		}),
	],
})
export class AppModule {}
```

### 2.3. Implementing and providing a custom loader

Implement an injectable class that implements `IEnvironmentVariablesLoader`:

```ts
@Injectable()
export class MyEnvironmentVariablesLoader<TVariable extends string> implements IEnvironmentVariablesLoader<TVariable> {
	public load(): EnvironmentVariablesRecord<TVariable> | Observable<EnvironmentVariablesRecord<TVariable>> {
		...
	}
}
```

Provide your custom loader:

```ts
@NgModule({
	imports: [EnvironmentVariablesModule],
	providers: [
		{
			provide: ENVIRONMENT_VARIABLES_LOADER,
			useClass: MyEnvironmentVariablesLoader,
		},
	],
})
export class AppModule {}
```

### 2.4. Example applications

Please check out the source code repository for two example applications.

[`apps/environment-variables-fetch-example`](https://github.com/infinum/ngx-nuts-and-bolts/tree/main/apps/environment-variables-fetch-example) demonstrates an example that uses `EnvironmentVariablesStaticLoader`. In `main.ts` (before the application is loaded), `./assets/env.json` is fetched using `fetch` and stored into `env` property on `window`. Once the application is started, the loader reads from `window.env`. You can start this example with `npm run start:environment-variables-fetch-example`.

[`apps/environment-variables-ssr-example`](https://github.com/infinum/ngx-nuts-and-bolts/tree/main/apps/environment-variables-ssr-example) uses `EnvironmentVariablesSSRLoader`. The application has to be started with environment variables exposed to the node process that is running the SSR app. You can start this example with `npm run start:environment-variables-ssr-example`

## 3. Opinion piece - what about Angular's `environment` files?

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
