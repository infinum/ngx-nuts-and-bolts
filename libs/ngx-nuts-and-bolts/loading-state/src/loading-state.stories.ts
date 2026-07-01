import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, finalize, first, switchMap } from 'rxjs/operators';
import { LoadingState } from './loading-state';

interface IMockData {
	foo: string;
}

@Component({
	selector: 'inf-loading-state-host',
	standalone: true,
	imports: [CommonModule],
	template: `
		@if (!isPending && (error$ | async) === null) {
			<button type="button" (click)="onResetClick()">Reset</button>
		}

		@if (isPending && (error$ | async) === null) {
			<button type="button" (click)="onResolveDataClick()">Resolve data</button>
			<button type="button" (click)="onTriggerErrorClick()">Trigger error</button>
		}

		@if (mockData$ | async; as mockData) {
			@if ((directLoading$ | async) === false && (error$ | async) === null) {
				<pre>{{ mockData | json }}</pre>
			}
		}

		@if (loading$ | async) {
			<div>Loading...</div>
		}

		@if (error$ | async; as error) {
			<div>
				<pre>{{ error }}</pre>

				<button type="button" (click)="onRetry()">Retry</button>
			</div>
		}
	`,
})
class LoadingStateHostComponent extends LoadingState {
	public isPending = true;
	private counter = 1;
	private mockDataTrigger$ = new Subject<IMockData>();

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

	private fetchMockData(): Observable<IMockData> {
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

const meta = {
	title: 'LoadingState',
	component: LoadingStateHostComponent,
	tags: ['autodocs'],
} satisfies Meta<LoadingStateHostComponent>;

export default meta;

type Story = StoryObj<LoadingStateHostComponent>;

export const Default: Story = {};
