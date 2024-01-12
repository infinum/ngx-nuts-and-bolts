import { Injectable, OnDestroy, inject } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Breadcrumb } from '../types';

type BreadcrumbOperation<T> =
	| {
			operation: 'push';
			value: Breadcrumb<T>;
	  }
	| {
			operation: 'pop';
	  };

@Injectable({ providedIn: 'root' })
export class BreadcrumbsService<T> implements OnDestroy {
	private readonly subscriptions = new Subscription();

	private readonly router = inject(Router);
	private readonly _breadcrumbs$ = new BehaviorSubject<Array<Breadcrumb<T>>>([]);
	public readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

	public get breadcrumbs() {
		return this._breadcrumbs$.getValue();
	}

	constructor() {
		this.subscriptions.add(
			this.router.events.subscribe((event) => {
				if (event instanceof NavigationEnd) {
					this.processQueue();
				}
				if (event instanceof NavigationCancel) {
					this.resetQueue();
				}
			})
		);
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private readonly _operationsQueue$ = new BehaviorSubject<Array<BreadcrumbOperation<T>>>([]);
	public readonly operationsQueue$ = this._operationsQueue$.asObservable();

	public push(value: Breadcrumb<T>) {
		const queue = this._operationsQueue$.getValue();
		queue.push({ operation: 'push', value });

		this._operationsQueue$.next(queue);
	}

	public pop() {
		const queue = this._operationsQueue$.getValue();
		queue.push({ operation: 'pop' });

		this._operationsQueue$.next(queue);
	}

	private processQueue() {
		this._operationsQueue$.getValue().forEach((operation) => {
			if (operation.operation === 'push') {
				this._push(operation.value);
			} else {
				this._pop();
			}
		});

		this.resetQueue();
	}

	private resetQueue() {
		this._operationsQueue$.next([]);
	}

	private _push(value: Breadcrumb<T>) {
		const breadcrumbs = this._breadcrumbs$.getValue();
		breadcrumbs.push(value);
		this._breadcrumbs$.next(breadcrumbs);
	}

	private _pop() {
		const breadcrumbs = this._breadcrumbs$.getValue();
		const popped = breadcrumbs.pop();
		this._breadcrumbs$.next(breadcrumbs);
		return popped;
	}
}
