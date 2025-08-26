import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpCacheService } from './http-cache.service';

describe('HttpCacheService', () => {
	let service: HttpCacheService;

	beforeEach(() => {
		service = new HttpCacheService();
	});

	it('should set, get and clear in-flight requests', () => {
		const key = 'GET /api/items';
		const inFlight$ = of(new HttpResponse({ status: 200, body: { ok: true } }));

		expect(service.getInFlight(key)).toBeUndefined();
		service.setInFlight(key, inFlight$);
		expect(service.getInFlight(key)).toBe(inFlight$);
		service.clearInFlight(key);
		expect(service.getInFlight(key)).toBeUndefined();
	});

	it('should return undefined for missing cache', () => {
		const result = service.getFromCache('missing', Date.now());
		expect(result).toBeUndefined();
	});

	it('should store and return cached response until expiry', () => {
		const key = 'GET /api/users';
		const now = 1_000;
		const response = new HttpResponse({ status: 200, body: { id: 1 } });

		service.setCache(key, response, 100, now);
		const cached = service.getFromCache<typeof response.body>(key, now + 50);
		expect(cached).toBeInstanceOf(HttpResponse);
		expect(cached?.body).toEqual({ id: 1 });

		// After expiry it should be removed and return undefined
		const expired = service.getFromCache(key, now + 101);
		expect(expired).toBeUndefined();
	});

	it('should not store cache entries with non-positive TTL', () => {
		const key = 'GET /api/ttl0';
		const now = 1_000;
		const response = new HttpResponse({ status: 200, body: { ok: true } });

		service.setCache(key, response, 0, now);
		expect(service.getFromCache(key, now)).toBeUndefined();
	});
});
