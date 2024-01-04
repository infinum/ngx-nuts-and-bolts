import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Breadcrumb } from '../types';

@Injectable({ providedIn: 'root' })
export class BreadcrumbsService<T> {
	private readonly _breadcrumbs$ = new BehaviorSubject<Array<Breadcrumb<T>>>([]);
	public readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

	public get breadcrumbs() {
		return this._breadcrumbs$.getValue();
	}

	public pop() {
		const breadcrumbs = this._breadcrumbs$.getValue();
		const popped = breadcrumbs.pop();
		this._breadcrumbs$.next(breadcrumbs);
		return popped;
	}

	public push(value: Breadcrumb<T>) {
		const breadcrumbs = this._breadcrumbs$.getValue();
		breadcrumbs.push(value);
		this._breadcrumbs$.next(breadcrumbs);
	}
}
