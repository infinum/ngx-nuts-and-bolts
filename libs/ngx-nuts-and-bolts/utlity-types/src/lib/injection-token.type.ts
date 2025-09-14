import { InjectionToken } from '@angular/core';

export type DITokenType<T> = T extends InjectionToken<infer X> ? X : never;
