# msw-public

Hosts the [Mock Service Worker](https://mswjs.io) script (`mockServiceWorker.js`) shared by the example apps. Apps copy it to their output root via a build `assets` entry and list `msw-public` in `implicitDependencies`, so `nx affected` picks up changes to the worker.

After upgrading `msw`, regenerate the worker with:

```bash
pnpm exec msw init libs/msw-public --no-save
```
