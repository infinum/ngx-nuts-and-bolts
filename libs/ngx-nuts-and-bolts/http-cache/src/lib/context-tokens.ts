import { HttpContextToken } from '@angular/common/http';

export const BYPASS_CACHE_INTERCEPTOR = new HttpContextToken<boolean>(() => false);
export const CACHE_TTL_MS = new HttpContextToken<number>(() => 5_000);
export const CACHEABLE_METHODS = new HttpContextToken<ReadonlyArray<string>>(() => ['GET']);
export const CACHE_KEY_OVERRIDE = new HttpContextToken<string | null>(() => null);
