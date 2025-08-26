import { Directive, InjectionToken, inject } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { debounce, distinctUntilChanged, tap } from 'rxjs/operators';

const DEFAULT_LOADER_ENTER_DELAY = 250;
const DEFAULT_LOADER_LEAVE_DELAY = 0;

export type LoadingStateConfig = {
	enterDelay?: number;
	leaveDelay?: number;
};

export const LOADING_STATE_CONFIG = new InjectionToken<LoadingStateConfig>('LOADING_STATE_CONFIG');

export type PrivateLoadingState<TError> = {
	_loading$: BehaviorSubject<boolean>;
	_error$: BehaviorSubject<TError | null>;
};

export type PublicLoadingState<TError> = {
	initialLoadDone$: Observable<boolean>;
	loading$: Observable<boolean>;
	error$: Observable<TError | null>;
};

@Directive()
export abstract class LoadingState<TError = unknown> {
	private readonly config = inject(LOADING_STATE_CONFIG, {
		optional: true,
	}) ?? {
		enterDelay: DEFAULT_LOADER_ENTER_DELAY,
		leaveDelay: DEFAULT_LOADER_LEAVE_DELAY,
	};

	// eslint-disable-next-line rxjs/no-exposed-subjects
	protected readonly loadingTrigger$ = new BehaviorSubject<void>(undefined);

	// eslint-disable-next-line rxjs/no-exposed-subjects
	protected readonly _error$: PrivateLoadingState<TError>['_error$'];
	public readonly error$: PublicLoadingState<TError>['error$'];

	// eslint-disable-next-line rxjs/no-exposed-subjects
	protected readonly _loading$: PrivateLoadingState<TError>['_loading$'];
	public readonly loading$: PublicLoadingState<TError>['loading$'];

	public readonly initialLoadDone$: PublicLoadingState<TError>['initialLoadDone$'];
	public readonly directLoading$: PublicLoadingState<TError>['loading$'];

	constructor() {
		const { _error$, _loading$ } = privateLoadingState<TError>();
		const directLoading$ = _loading$.pipe(distinctUntilChanged());
		const { error$, loading$, initialLoadDone$ } = publicLoadingState(
			{ _error$, _loading$ },
			this.config.enterDelay,
			this.config.leaveDelay
		);

		this._error$ = _error$;
		this.error$ = error$;

		this._loading$ = _loading$;
		this.loading$ = loading$;

		this.initialLoadDone$ = initialLoadDone$;
		this.directLoading$ = directLoading$;
	}

	public onRetry(): void {
		this.loadingTrigger$.next();
	}
}

export function privateLoadingState<TError = unknown>(): PrivateLoadingState<TError> {
	return {
		_loading$: new BehaviorSubject<boolean>(false),
		_error$: new BehaviorSubject<TError | null>(null),
	};
}

export function publicLoadingState<TError = unknown>(
	{ _loading$, _error$ }: PrivateLoadingState<TError>,
	loaderEnterDelay: number = DEFAULT_LOADER_ENTER_DELAY,
	loaderLeaveDelay: number = DEFAULT_LOADER_LEAVE_DELAY
): PublicLoadingState<TError> {
	const initialLoadDone$ = new BehaviorSubject(false);

	const loading$ = _loading$.pipe(
		tap((loading) => {
			if (loading) {
				_error$.next(null);
			}
		}),
		debounce((loading) => {
			return timer(loading ? loaderEnterDelay : loaderLeaveDelay);
		}),
		tap((loading) => {
			if (!loading && !initialLoadDone$.value) {
				initialLoadDone$.next(true);
			}
		}),
		distinctUntilChanged()
	);

	const error$ = _error$.pipe(
		distinctUntilChanged(),
		tap((e) => {
			if (e) {
				_loading$.next(false);
				initialLoadDone$.next(false);
			}
		})
	);

	return {
		loading$,
		initialLoadDone$,
		error$,
	};
}
