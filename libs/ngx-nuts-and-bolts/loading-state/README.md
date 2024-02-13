# @infinum/ngx-nuts-and-bolts/loading-state

...or how I learned to start worrying and handle the error states.

Secondary entry point of `@infinum/ngx-nuts-and-bolts`. It can be used by importing from `@infinum/ngx-nuts-and-bolts/loading-state`.

## 1. Features

`LoadingState` class allows you to extend whatever lives within DI provider with loading and error states.

Different enter and leave delay times allow for showing and hiding the loader only if the loading takes at least a certain amount of time. This provides a better UX where the user will not see a loading state if the loading takes very short time, preventing quick flashes. If for whatever reason you need access to the loading observable without any debounce delays, you can use `directLoading$`.

When loading begins, any previous error is cleared, avoiding the need to handle clearing errors on retry manually. Similarly, when an error is set, the loading state is cleared. Please note that these side-effects will trigger only if you subscribe to both the error and the loading observables.

Accompanying loading and error observables is an observable for checking if the initial loading is done. This can be useful to show a different loading state on the initial load.

It usually makes sense to allow the user to retry on error. For this purpose, `LoadingState` exposes `loadingTrigger$` observable that is used to "kick-start" the RxJS pipeline and `onRetry` handler that triggers `loadingTrigger$`.

## 2. Configuration

By default, loader enter delay is set to 250ms and loader leave delay is set to 0ms. You can change these values globally for all components that extend `LoadingState` or on a case-by-case basis. If there is no globally defined provider nor a component-level provider for some specific component, the component will use the default delays.

### 2.1. Setting delays globally

Provide the desired values in a provider in your `AppModule`:

```ts
{
	provide: LOADING_STATE_CONFIG,
	useValue: {
		enterDelay: 300,
		leaveDelay: 100,
	}
}
```

### 2.2. Setting delays for a particular component (or a subtree)

Pass the desired values via component-specific provider (this will override any values set in the global provider):

```ts
@Component({
	...
	providers: [{
		provide: LOADING_STATE_CONFIG,
		useValue: {
			enterDelay: 300,
			leaveDelay: 100,
		}
	}],
	...
})
class MyComponent extends LoadingState {}
```

## 3. Usage

There are two ways to implement handling the loading and error states:

1. Extend `LoadingState` base class and use `_loading$` and `_error$` observables to emit values and `loading$` and `error$` observables to react to state changes
   - this requires the least amount of boilerplate and works for components that have only one set of loading and error states
2. Use `privateLoadingState` and `publicLoadingState` functions to manually create observables
   - this requires a bit more work, but it allows you to have multiple sets of loading and error states within the same component

### 3.1. Extending `LoadingState`

```html
<ng-container *ngIf="templateData$ | async as templateData">...</ng-container>

<ng-container *ngIf="loading$ | async">Loading...</ng-container>

<ng-container *ngIf="error$ | async">
	<button (click)="onRetry()">Retry</button>
</ng-container>
```

```ts

interface ITemplateData { ... }

class MyComponent extends LoadingState {
	public readonly templateData$ = this.createTemplateDataObservable();

	private createTemplateDataObservable(): Observable<ITemplateData> {
		this.loadingTrigger$.pipe( // onRetry() will emit to loadingTrigger$
			switchMap(() => {
				this._loading$.next(true);

				return this.fetchData().pipe(
					catchError((e) => {
						// you could add additional error handling logic, based on the error type
						this._error.next(e);
						return EMPTY;
					}),
					finalize(() => {
						this._loading$.next(false);
					})
				);
			}),
		)
	}

	private fetchData(): Observable<ITemplateData> {
		...
	}
}
```

Please note that data, loading and error containers are not nested inside of each other in the template. It is ok to have some additional wrapper elements, but loading container should not be a descendant of the data container (nor vice-versa) because it would introduce dependencies to the order in which the subscriptions are initialized and could cause the loading, error, and/or data to not render in certain cases. Keep the template simple and flat.

There is a possible variation when `fetchData` returns a long-living observable (e.g. if it depends on route query params):

```ts
private createTemplateDataObservable(): Observable<ITemplateData> {
	this.loadingTrigger$.pipe(
		switchMap(() => {
			this._loading$.next(true);

			return this.fetchData().pipe(
				catchError((e) => {
					this._error.next(e);
					this._loading$.next(false); // necessary because returning EMPTY will not trigger the downstream tap
					return EMPTY;
				}),
				tap(() => {
					// finalize was replaced with tap because a long-living observable fill never complete
					this._loading$.next(false);
				})
			);
		}),
	)
}
```

### 3.2. Use with helper functions

Ideally, the component should only be handling one loading/error state for one data source observable. If the component is handling multiple independent data source observables, it is probably best to consider splitting up the component into multiple components.

If you really do need to handle multiple data source observables from the same component, you will not be able to extend `LoadingState` because it can only handle one source observable. In such cases, use `publicLoadingState` and `privateLoadingState` to create multiple sets of loading state observables. Here is a quick example:

```ts
class MyComponent {
	protected readonly loadingTrigger1$ = new BehaviorSubject<void>(undefined);
	protected readonly _error1$: IPrivateLoadingState<TError>['_error$'];
	public readonly error1$: IPublicLoadingState<TError>['error$'];
	protected readonly _loading1$: IPrivateLoadingState<TError>['_loading$'];
	public readonly loading1$: IPublicLoadingState<TError>['loading$'];

	protected readonly loadingTrigger2$ = new BehaviorSubject<void>(undefined);
	protected readonly _error2$: IPrivateLoadingState<TError>['_error$'];
	public readonly error2$: IPublicLoadingState<TError>['error$'];
	protected readonly _loading2$: IPrivateLoadingState<TError>['_loading$'];
	public readonly loading2$: IPublicLoadingState<TError>['loading$'];

	constructor() {
		const _state1 = privateLoadingState();
		const state1 = publicLoadingState(_state1);
		this._error1$ = _state1._error$;
		this.error1$ = state1.error$;
		this._loading1$ = _state1._loading$;
		this.loading1$ = state1.loading$;

		const _state2 = privateLoadingState();
		const state2 = publicLoadingState(_state2);
		this._error2$ = _state2._error$;
		this.error2$ = state2.error$;
		this._loading2$ = _state2._loading$;
		this.loading2$ = state2.loading$;
	}
}
```

You continue to use the two sets of \_error$, error$, \_loading$ and loading$ just as you would when working with one set when extending `LoadingState`. It is probably clear why you would not want to do this and stick with using only one set of states. Do this only if necessary.
