---
id: environment-variables
title: Environment variables
sidebar_label: Environment variables
---

Most applications that are deployed to multiple environments have a need for environment variables that can have different values, depending on which environment the app is running in. `EnvironmentVariablesService` and the corresponding modules from `ngx-nuts-and-bolts` allow for handling of environment variables in a way that does not require application to be re-built nor to be re-deployed (only restarted in the case of SSR). This allows the same build to be deployed to multiple environments, increasing reliability and providing confidence that the codebase that was tested in pre-production environment is identical to what gets deployed to production. Additionally, this approach works well with Docker - the same Docker image containing the build can be run with different environment values for different environments.

## What about Angular's `environment` files?

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

Although these out-of-the-box files are named `environment.ts` and `environment.prod.ts` and Angular CLI used to refer to them as `environments`, Angular CLI has actually been updated to call these files `configurations`. This is a more suiting name because these files are not the best fit for defining environment-specific values like, for example, API URL. The main purpose for these files should be to define differences in build configurations - think of them as pragmas. Out-of-the-box they are used to determine whether Angular should run in production or development mode. Even though one of the configurations is called `production` and the other `development`, these are usually only two configurations you will need. In environments where it is important to provide a optimized build to the end-user, use `production` configuration. In environments where it is important that you can easily debug the deployed code, use `development` configuration. Even if you have many different environments, you are probably still ok with using one of these only two configurations in each of the environments. You might want to add one additional middle-ground configuration that has all the optimizations enabled, but also includes sourcemaps that can be used to help with debugging. Basically `production` configuration + sourcemaps on top.

We can only hope that one day Angular CLI completely drops `environment` from naming and starts calling these files `configuration` files (e.g. `configuration.dev.ts`, `configuration.prod.ts`). This would better convey use cases where these files are a good fit, and environment variables are not one of them.
