import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type CacheEntry<T> = {
	expiresAtMs: number;
	response: HttpResponse<T>;
};

@Injectable({ providedIn: 'root' })
export class HttpCacheService {
	private readonly inFlightRequests = new Map<string, Observable<HttpEvent<unknown>>>();
	private readonly responseCache = new Map<string, CacheEntry<unknown>>();

	public getInFlight(key: string): Observable<HttpEvent<unknown>> | undefined {
		return this.inFlightRequests.get(key);
	}

	public setInFlight(key: string, request$: Observable<HttpEvent<unknown>>): void {
		this.inFlightRequests.set(key, request$);
	}

	public clearInFlight(key: string): void {
		this.inFlightRequests.delete(key);
	}

	public getFromCache<T = unknown>(key: string, nowMs: number): HttpResponse<T> | undefined {
		const entry = this.responseCache.get(key);
		if (!entry) {
			return undefined;
		}

		if (entry.expiresAtMs <= nowMs) {
			this.responseCache.delete(key);
			return undefined;
		}

		return entry.response as HttpResponse<T>;
	}

	public setCache<T = unknown>(key: string, response: HttpResponse<T>, ttlMs: number, nowMs: number): void {
		if (ttlMs <= 0) {
			return;
		}

		this.responseCache.set(key, {
			response,
			expiresAtMs: nowMs + ttlMs,
		});
	}
}
