---
id: route-config-loading
title: Route config loading
sidebar_label: Route config loading
---

## 1. Features

`createRouteConfigLoadingObservable` function receives `Router` and returns an `Observable` that emits `true`/`false` during route configuration loading. This can be useful to show global loading states during lazy chunk loading. Feel free do add debounce or other operators as needed for your specific use case.

## 2. Usage

```ts
import { createRouteConfigLoadingObservable } from '@infinum/ngx-nuts-and-bolts';

...

class MyComponent {
	public readonly isRouteConfigLoading$ = createRouteConfigLoadingObservable(this.router);
}
```

We leave it up to you to decide what to do with this `Observable<boolean>` and hook it up to some loading state indication in your UI.
