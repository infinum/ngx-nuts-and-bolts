import { InjectionToken } from '@angular/core';

export const PROCESS = new InjectionToken<NodeJS.Process>('PROCESS');
export const LOCAL_STORAGE = new InjectionToken<Storage>('LOCAL_STORAGE');
export const SESSION_STORAGE = new InjectionToken<Storage>('SESSION_STORAGE');
export const WINDOW = new InjectionToken<Storage>('WINDOW');
