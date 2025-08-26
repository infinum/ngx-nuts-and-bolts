import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpContext, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BYPASS_CACHE_INTERCEPTOR, CACHE_TTL_MS, CACHEABLE_METHODS, CACHE_KEY_OVERRIDE } from './context-tokens';
import { httpCacheInterceptor } from './http-cache.interceptor';

describe('httpCacheInterceptor', () => {
	let http: HttpClient;
	let httpTesting: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient(withInterceptors([httpCacheInterceptor])), provideHttpClientTesting()],
		});

		http = TestBed.inject(HttpClient);
		httpTesting = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpTesting.verify();
	});

	it('should bypass cache and dedupe when BYPASS_CACHE_INTERCEPTOR is true', async () => {
		const ctx = new HttpContext().set(BYPASS_CACHE_INTERCEPTOR, true);

		const p1 = firstValueFrom(http.get<{ url: string }>('/api/a', { context: ctx }));
		const p2 = firstValueFrom(http.get<{ url: string }>('/api/a', { context: ctx }));

		const reqs = httpTesting.match('/api/a');
		expect(reqs.length).toBe(2);
		reqs[0].flush({ url: '/api/a' });
		reqs[1].flush({ url: '/api/a' });

		await p1;
		await p2;
	});

	it('should dedupe concurrent identical GET requests and caches the response', async () => {
		const p1 = firstValueFrom(http.get<{ value: number }>('/api/items'));
		const p2 = firstValueFrom(http.get<{ value: number }>('/api/items'));

		const req = httpTesting.expectOne('/api/items');
		req.flush({ value: 42 });

		const [r1, r2] = await Promise.all([p1, p2]);
		expect(r1).toEqual(r2);

		// Next call should be served from cache: no new backend request
		const r3 = await firstValueFrom(http.get<{ value: number }>('/api/items'));
		expect(r3).toEqual({ value: 42 });
		httpTesting.expectNone('/api/items');
	});

	it('should respect CACHE_TTL_MS for cache expiry (MISS case)', async () => {
		const nowSpy = jest.spyOn(Date, 'now');

		const ctx = new HttpContext().set(CACHE_TTL_MS, 1);

		// First request at t=1000
		nowSpy.mockReturnValueOnce(1000); // request time (lookup)
		nowSpy.mockReturnValueOnce(1000); // response time (cache set)
		const p1 = firstValueFrom(http.get<number>('/api/ttl', { context: ctx }));
		httpTesting.expectOne('/api/ttl').flush(1);
		expect(await p1).toBe(1);

		// Second request at t=1002 (after TTL=1ms) → should MISS cache and hit backend
		nowSpy.mockReturnValueOnce(1002); // request time (lookup)
		nowSpy.mockReturnValueOnce(1002); // response time (cache set for completeness)
		const p2 = firstValueFrom(http.get<number>('/api/ttl', { context: ctx }));
		httpTesting.expectOne('/api/ttl').flush(2);
		expect(await p2).toBe(2);

		nowSpy.mockRestore();
	});

	it('should respect CACHE_TTL_MS for cache expiry (HIT case)', async () => {
		const nowSpy = jest.spyOn(Date, 'now');

		const ctx = new HttpContext().set(CACHE_TTL_MS, 5);

		// First request at t=1000
		nowSpy.mockReturnValueOnce(1000); // request time (lookup)
		nowSpy.mockReturnValueOnce(1000); // response time (cache set)
		const p1 = firstValueFrom(http.get<number>('/api/ttl', { context: ctx }));
		httpTesting.expectOne('/api/ttl').flush(1);
		expect(await p1).toBe(1);

		// Second request at t=1002 (after TTL=1ms) → should HIT cache and return 1
		nowSpy.mockReturnValueOnce(1002); // request time (lookup)
		nowSpy.mockReturnValueOnce(1002); // response time (cache set for completeness)
		const p2 = firstValueFrom(http.get<number>('/api/ttl', { context: ctx }));
		expect(await p2).toBe(1);

		nowSpy.mockRestore();
	});

	it('should support custom cache key and cacheable methods for POST', async () => {
		const ctx = new HttpContext().set(CACHEABLE_METHODS, ['GET', 'POST']).set(CACHE_KEY_OVERRIDE, 'custom-key');

		// Two concurrent POST calls should dedupe to a single backend request
		const p1 = firstValueFrom(http.post<string>('/api/something', { a: 1 }, { context: ctx }));
		const p2 = firstValueFrom(http.post<string>('/api/something', { a: 1 }, { context: ctx }));

		const req = httpTesting.expectOne('/api/something');
		req.flush('ok');

		const [r1, r2] = await Promise.all([p1, p2]);
		expect(r1).toBe('ok');
		expect(r2).toBe('ok');

		// Subsequent POST with same custom key should be served from cache
		const r3 = await firstValueFrom(http.post<string>('/api/something', { a: 1 }, { context: ctx }));
		expect(r3).toBe('ok');
		httpTesting.expectNone('/api/something');
	});
});
