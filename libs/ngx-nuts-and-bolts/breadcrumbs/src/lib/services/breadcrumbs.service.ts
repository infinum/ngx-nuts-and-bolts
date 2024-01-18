import { Injectable, OnDestroy, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationCancel, NavigationEnd, NavigationError, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BREADCRUMBS_CONFIG } from '../providers';
import { Breadcrumb } from '../types';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CONSOLE } from '@infinum/ngx-nuts-and-bolts';

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
	private static instanceCounter = 0;
	private readonly instanceId: number;
	private readonly title = inject(Title);
	private readonly config = inject(BREADCRUMBS_CONFIG);
	private readonly console = inject(CONSOLE, { optional: true }) || console;
	private readonly subscriptions = new Subscription();
	public readonly parentInstance = inject(BreadcrumbsService, { skipSelf: true, optional: true });

	private readonly router = inject(Router);
	private readonly _breadcrumbs$ = new BehaviorSubject<Array<Breadcrumb<T>>>([]);
	public readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

	public get breadcrumbs() {
		return this._breadcrumbs$.getValue();
	}

	constructor() {
		this.instanceId = BreadcrumbsService.instanceCounter;
		BreadcrumbsService.instanceCounter++;

		this.subscriptions.add(
			this.router.events.subscribe((event) => {
				if (event instanceof NavigationEnd) {
					this.processQueue();
				}
				if (event instanceof NavigationCancel || event instanceof NavigationError) {
					this.resetQueue();
				}
			})
		);

		if (this.config.logLevel === 'debug') {
			this.console.log(`[Breadcrumbs][${this.instanceId}] Service initialized:`, this);

			this.subscriptions.add(
				this._breadcrumbs$.subscribe((breadcrumbs) => {
					this.console.log(`[Breadcrumbs][${this.instanceId}] State updated:`, breadcrumbs);
				})
			);
		}
	}

	public ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	private readonly _operationsQueue$ = new BehaviorSubject<Array<BreadcrumbOperation<T>>>([]);
	public readonly operationsQueue$ = this._operationsQueue$.asObservable();

	public push(value: Breadcrumb<T>) {
		this.parentInstance?.push(value);

		const operation: BreadcrumbOperation<T> = { operation: 'push', value };

		const queue = this._operationsQueue$.getValue();
		queue.push(operation);

		if (this.config.logLevel === 'debug') {
			this.console.log(`[Breadcrumbs][${this.instanceId}] Operation queued:`, operation);
		}

		this._operationsQueue$.next(queue);
	}

	public pop() {
		this.parentInstance?.pop();

		const operation: BreadcrumbOperation<T> = { operation: 'pop' };

		const queue = this._operationsQueue$.getValue();
		queue.push(operation);

		if (this.config.logLevel === 'debug') {
			this.console.log(`[Breadcrumbs][${this.instanceId}] Operation queued:`, operation);
		}

		this._operationsQueue$.next(queue);
	}

	private processQueue() {
		const queue = this._operationsQueue$.getValue();

		if (this.config.logLevel === 'debug') {
			this.console.log(`[Breadcrumbs][${this.instanceId}] Processing operations queue:`, queue);
		}

		const breadcrumbs = this._breadcrumbs$.getValue();
		this._operationsQueue$.getValue().forEach((operation) => {
			if (operation.operation === 'push') {
				breadcrumbs.push(operation.value);
				if (this.config.logLevel === 'debug') {
					this.console.log(`[Breadcrumbs][${this.instanceId}] Pushed value:`, operation.value);
				}
			} else {
				const poppedValue = breadcrumbs.pop();
				if (this.config.logLevel === 'debug') {
					this.console.log(`[Breadcrumbs][${this.instanceId}] Popped value:`, poppedValue);
				}
			}
		});
		this._breadcrumbs$.next(breadcrumbs);
		this.updateTitle(breadcrumbs);

		this.resetQueue();
	}

	private resetQueue() {
		this._operationsQueue$.next([]);

		if (this.config.logLevel === 'debug') {
			this.console.log(`[Breadcrumbs][${this.instanceId}] Operations queue reset`);
		}
	}

	private updateTitle(breadcrumbs: Array<Breadcrumb<T>>) {
		const titleConfiguration = this.config.titleConfiguration;
		if (!titleConfiguration) {
			return;
		}

		const newTitle = titleConfiguration.formatter(breadcrumbs);

		this.title.setTitle(newTitle);

		if (this.config.logLevel === 'debug') {
			this.console.log(`[Breadcrumbs][${this.instanceId}] Page title set to "${newTitle}"`);
		}
	}
}
