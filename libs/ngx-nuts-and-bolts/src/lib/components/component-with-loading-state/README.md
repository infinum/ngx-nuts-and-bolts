# Component with loading state

## Features

`ComponentWithLoadingState` allows you to extend your application components with loading and error states.

Different enter and leave delay times allow for showing and hiding the loader only if the loading takes at least a certain amount of time. This provides a better UX where the user will not see a loading state if the loading takes very short time, preventing loading flashes. If for whatever reason you need access to the loading observable without any debounce delays, you can use `directLoading$`.

When loading begins, any previous error is cleared, avoiding the need to handle clearing errors on retry manually. Similarly, when an error is set, loading state is cleared.

Accompanying loading and error observables is an observable for checking if the initial loading is done. This can be useful to show a different loading state on the initial load.

It usually makes sense to allow the user to retry on error. For this purpose, `ComponentWithLoadingState` exposes a loading trigger observable and a retry action handler.

## Usage

There are two ways to implement handling of error:

1. Extend `ComponentWithLoadingState` base class and use `_loading$` and `_error$` observables to emit values
   - this requires the least amount of boilerplate and works for components that have only one set of loading and error states
2. Use `privateLoadingState` and `publicLoadingState` functions to manually create observables
   - this requires a bit more work, but it allows you to have multiple sets of loading and error states within the same component

### Usage example with extending `ComponentWithLoadingState`

```html
<ng-container *ngIf="templateData$ | async as templateData">...</ng-container>

<ng-container *ngIf="loading$ | async">Loading...</ng-container>

<ng-container *ngIf="error$ | async">
	<button (click)="onRetry()">Retry</button>
</ng-container>
```

```ts

interface ITemplateData { ... }

class MyComponent extends ComponentWithLoadingState {
	public readonly templateData$ = this.createTemplateDataObservable();

	private createTemplateDataObservable(): Observable<ITemplateData> {
		this.loadingTrigger$.pipe( // onRetry() will emit to loadingTrigger$
			tap(() => {
				this._loading$.next(true);
			}),
			switchMap(() => {
				return this.fetchData();
			}),
			catchError((e) => {
				this._error.next(e);
				return EMPTY;
			}),
			finalize(() => {
				this._loading$.next(false);
			})
		)
	}

	private fetchData(): Observable<ITemplateData> {
		...
	}
}
```

Variation when `fetchData` returns a long-living observable (e.g. if it depends on route query params):

```ts
this.loadingTrigger$.pipe(
	tap(() => {
		this._loading$.next(true);
	}),
	switchMap(() => {
		return this.fetchData();
	}),
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
```

## Configuration

By default, loader enter delay is set to 250ms and loader leave delay is set to 0ms. You can change these values globally for all components that extend `ComponentWithLoadingState` or on a case-by-case basis. If there is no globally defined provider nor an explicit value set for a particular component, that component will use the default delays.

### Setting delays globally

Provide the desired values in a provider in your `AppModule`:

```ts
{
	provide: COMPONENT_WITH_LOADING_STATE_CONFIG,
	useValue: {
		enterDelay: 300,
		leaveDelay: 100,
	}
}
```

### Setting delays for a particular case

Pass the desired values via the constructor (this will override any values set in the global provider):

```ts
class MyComponent extends ComponentWithLoadingState {
	constructor() {
		super({
			enterDelay: 300,
			leaveDelay: 100,
		});
	}
}
```
