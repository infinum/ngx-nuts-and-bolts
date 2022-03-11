import { asyncScheduler, Observable, throwError } from 'rxjs';
import { observeOn } from 'rxjs/operators';

export function asyncError(err: Error): Observable<never> {
	return throwError(err).pipe(observeOn(asyncScheduler));
}
