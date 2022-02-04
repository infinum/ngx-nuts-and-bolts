import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoadingState } from './loading-state';

@Component({
	selector: 'inf-component-with-loading-state-host',
	template: `
		<div *ngIf="loading$ | async" class="loader">Loading</div>
		<div *ngIf="error$ | async as error" class="error">{{ error }}</div>
	`,
})
class LoadingStateHostComponent extends LoadingState {
	public setLoading(loading: boolean): void {
		this._loading$.next(loading);
	}

	public setError(error: unknown): void {
		this._error$.next(error);
	}
}

describe('LoadingState', () => {
	let fixture: ComponentFixture<LoadingStateHostComponent>;
	let component: LoadingStateHostComponent;
	const loaderSelector = '.loader';
	const errorSelector = '.error';

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LoadingStateHostComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LoadingStateHostComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should show loader after 250ms', fakeAsync(() => {
		component.setLoading(true);
		expect(fixture.debugElement.query(By.css(loaderSelector))).toBeFalsy();
		expect(fixture.debugElement.query(By.css(errorSelector))).toBeFalsy();

		tick(250);
		fixture.detectChanges();

		expect(fixture.debugElement.query(By.css(loaderSelector))).toBeTruthy();
		expect(fixture.debugElement.query(By.css(errorSelector))).toBeFalsy();
	}));

	it('should not show loader if loading is shorter than 250ms', fakeAsync(() => {
		component.setLoading(true);
		expect(fixture.debugElement.query(By.css(loaderSelector))).toBeFalsy();
		expect(fixture.debugElement.query(By.css(errorSelector))).toBeFalsy();

		tick(150);
		component.setLoading(false);
		fixture.detectChanges();

		expect(fixture.debugElement.query(By.css(loaderSelector))).toBeFalsy();
		expect(fixture.debugElement.query(By.css(errorSelector))).toBeFalsy();

		tick(100);
		fixture.detectChanges();

		expect(fixture.debugElement.query(By.css(loaderSelector))).toBeFalsy();
		expect(fixture.debugElement.query(By.css(errorSelector))).toBeFalsy();
	}));

	it('should emit the error and hide the loader', fakeAsync(() => {
		expect(fixture.debugElement.query(By.css(loaderSelector))).toBeFalsy();
		expect(fixture.debugElement.query(By.css(errorSelector))).toBeFalsy();

		component.setLoading(true);
		component.setError('epic fail');

		tick(250);
		fixture.detectChanges();

		expect(fixture.debugElement.query(By.css(loaderSelector))).toBeFalsy();
		expect(fixture.debugElement.query(By.css(errorSelector))).toBeTruthy();
	}));
});
