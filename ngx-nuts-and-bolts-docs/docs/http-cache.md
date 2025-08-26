---
id: http-cache
title: HTTP cache and request deduplication
sidebar_label: HTTP cache
---

Simple, configurable HTTP response caching and in-flight request deduplication for Angular `HttpClient`.

### Features

- Cache successful `HttpResponse` values per request key with TTL
- Deduplicate concurrent identical requests and share a single response
- Opt-in per HTTP method (default: `GET`)
- Per-request controls via `HttpContext`

### Installation

Add the interceptor to your application providers.

```ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpCacheInterceptor } from '@infinum/ngx-nuts-and-bolts/http-cache';

bootstrapApplication(AppComponent, {
	providers: [provideHttpClient(withInterceptors([httpCacheInterceptor]))],
});
```

### Usage

The interceptor works out-of-the-box. By default it:

- caches only `GET` requests
- uses a 5s TTL
- creates a cache key in the following format: `"<METHOD> <urlWithParams>"`

#### Per-request controls

Use `HttpContext` tokens from `@infinum/ngx-nuts-and-bolts/http-cache`.

```ts
import { HttpContext } from '@angular/common/http';
import {
	BYPASS_CACHE_INTERCEPTOR,
	CACHE_TTL_MS,
	CACHEABLE_METHODS,
	CACHE_KEY_OVERRIDE,
} from '@infinum/ngx-nuts-and-bolts/http-cache';

this.http.get<Data>(url, {
	context: new HttpContext().set(BYPASS_CACHE_INTERCEPTOR, true), // skip cache/dedup for this call
});

this.http.get<Data>(url, {
	context: new HttpContext().set(CACHE_TTL_MS, 30_000), // 30s TTL
});

this.http.post<Data>(url, body, {
	context: new HttpContext()
		.set(CACHEABLE_METHODS, ['GET', 'POST']) // make POST cacheable (opt-in)
		.set(CACHE_TTL_MS, 10_000),
});

this.http.get<Data>(url, {
	params: { q: 'term' },
	context: new HttpContext().set(CACHE_KEY_OVERRIDE, 'search:term'), // custom cache key
});
```

### Service API

You usually don't need this, but `HttpCacheService` is available for advanced control.

```ts
import { HttpCacheService } from '@infinum/ngx-nuts-and-bolts/http-cache';

constructor(private cache: HttpCacheService) {}

// read a cached response (if valid at "now")
const cached = this.cache.getFromCache<MyType>('GET /api/items?page=1', Date.now());

// clear in-flight marker when needed (normally handled by interceptor)
this.cache.clearInFlight('GET /api/items?page=1');
```

### Notes

- Only successful `HttpResponse` instances are cached.
- Errors are not cached; in-flight entries are cleared on error/complete.
- Deduplication shares the same Observable for concurrent identical requests (based on cache key).
- Set TTL to 0 or bypass to disable caching for a call.
- TTL starts ticking from the time the request has been sent, NOT from when the response comes
