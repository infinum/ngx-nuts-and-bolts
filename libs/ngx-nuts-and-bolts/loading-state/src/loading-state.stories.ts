import { Component } from '@angular/core';
import { Meta, Story } from '@storybook/angular';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, finalize, first, switchMap } from 'rxjs/operators';
import { LoadingState } from './loading-state';

type MockData = {
	foo: string;
};

@Component({
	template: `
		<button *ngIf="!isPending && (error$ | async) === null" (click)="onResetClick()">Reset</button>
		<ng-container *ngIf="isPending && (error$ | async) === null">
			<button (click)="onResolveDataClick()">Resolve data</button>
			<button (click)="onTriggerErrorClick()">Trigger error</button>
		</ng-container>

		<div *ngIf="mockData$ | async as mockData">
			<ng-container *ngIf="(directLoading$ | async) === false && (error$ | async) === null">
				<pre>{{ mockData | json }}</pre>
			</ng-container>
		</div>

		<div *ngIf="loading$ | async">Loading...</div>

		<div *ngIf="error$ | async as error">
			<pre>{{ error }}</pre>

			<button (click)="onRetry()">Retry</button>
		</div>
	`,
})
class LoadingStateHostComponent extends LoadingState {
	public isPending = true;
	private counter = 1;
	private mockDataTrigger$ = new Subject<MockData>();

	public readonly mockData$ = this.loadingTrigger$.pipe(
		switchMap(() => {
			this._loading$.next(true);

			return this.fetchMockData().pipe(
				catchError((e: unknown) => {
					this._error$.next(e);

					return EMPTY;
				}),
				finalize(() => {
					this._loading$.next(false);
				})
			);
		})
	);

	private fetchMockData(): Observable<MockData> {
		return this.mockDataTrigger$.pipe(first());
	}

	public onResolveDataClick(): void {
		this.isPending = false;
		this.mockDataTrigger$.next({ foo: `bar #${this.counter}` });
		this.counter++;
	}

	public onTriggerErrorClick(): void {
		this.isPending = false;
		this.mockDataTrigger$.error(new Error('foo'));
	}

	public onResetClick(): void {
		this.isPending = true;
		this.loadingTrigger$.next();
	}

	public override onRetry(): void {
		this.isPending = true;
		this.mockDataTrigger$ = new Subject();
		super.onRetry();
	}
}

export default {
	title: 'LoadingState',
	component: LoadingStateHostComponent,
} as Meta<LoadingStateHostComponent>;

const Template: Story<LoadingStateHostComponent> = (args: LoadingStateHostComponent) => ({
	component: LoadingStateHostComponent,
	props: args,
});

export const Default = Template.bind({});
Default.args = {};
