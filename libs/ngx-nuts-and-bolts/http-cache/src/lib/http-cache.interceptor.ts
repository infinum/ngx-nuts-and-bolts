import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of, share, tap, finalize } from 'rxjs';
import { BYPASS_CACHE_INTERCEPTOR, CACHE_KEY_OVERRIDE, CACHE_TTL_MS, CACHEABLE_METHODS } from './context-tokens';
import { HttpCacheService } from './http-cache.service';

function defaultCacheKey(req: Parameters<HttpInterceptorFn>[0]): string {
	const url = req.urlWithParams || req.url;
	// Include method as well to avoid mixing different method variants
	return `${req.method} ${url}`;
}

export const httpCacheInterceptor: HttpInterceptorFn = (req, next): Observable<HttpEvent<unknown>> => {
	const httpCacheService = inject(HttpCacheService);

	if (req.context.get(BYPASS_CACHE_INTERCEPTOR)) {
		return next(req);
	}

	const method = req.method.toUpperCase();
	const cacheableMethods = req.context.get(CACHEABLE_METHODS);
	const shouldCache = cacheableMethods.includes(method);

	const key = req.context.get(CACHE_KEY_OVERRIDE) || defaultCacheKey(req);

	if (shouldCache) {
		const cached = httpCacheService.getFromCache(key, Date.now());
		if (cached) {
			return of(cached);
		}

		const inFlight$ = httpCacheService.getInFlight(key);
		if (inFlight$) {
			return inFlight$;
		}
	}

	const shared$ = next(req).pipe(
		share(),
		tap((event) => {
			if (event instanceof HttpResponse && shouldCache) {
				const ttl = req.context.get(CACHE_TTL_MS);
				httpCacheService.setCache(key, event, ttl, Date.now());
			}
		}),
		finalize(() => {
			if (shouldCache) {
				httpCacheService.clearInFlight(key);
			}
		})
	);

	if (shouldCache) {
		httpCacheService.setInFlight(key, shared$);
	}
	return shared$;
};
