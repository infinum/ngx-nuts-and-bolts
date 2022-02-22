import { asyncScheduler, Observable, of } from 'rxjs';
import { observeOn } from 'rxjs/operators';

export function asyncData<TData>(data: TData): Observable<TData> {
	return of(data).pipe(observeOn(asyncScheduler));
}
