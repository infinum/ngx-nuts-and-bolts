import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BreadcrumbsService<T> {
	private readonly _breadcrumbs$ = new BehaviorSubject<Array<T>>([]);
	public readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

	public get breadcrumbs() {
		return this._breadcrumbs$.getValue();
	}

	public pop() {
		const breadcrumbs = this._breadcrumbs$.getValue();
		const poppedValue = breadcrumbs.pop();
		return poppedValue;
	}

	public push(value: T) {
		const breadcrumbs = this._breadcrumbs$.getValue();
		breadcrumbs.push(value);
		this._breadcrumbs$.next(breadcrumbs);
	}
}
