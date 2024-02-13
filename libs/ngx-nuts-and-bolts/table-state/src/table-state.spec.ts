/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable */
/* eslint-disable */
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { take } from 'rxjs/operators';
import {
	changeFilters,
	changePage,
	changeSort,
	createCustomFiltersObservable,
	createPaginationObservable,
	createSortObservable,
	IPageInfo,
	ISortInfo,
	TableQueryParam,
} from './table-state';

describe('Table sate', () => {
	let navigationSpy: jest.SpyInstance<Promise<boolean>>;
	let router: Router;
	let route: ActivatedRoute;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
		});

		router = TestBed.inject(Router);
		route = TestBed.inject(ActivatedRoute);

		navigationSpy = jest.spyOn(router, 'navigate');
	});

	it('should set query parameters for pagination', async () => {
		expect(navigationSpy).toHaveBeenCalledTimes(0);

		const pageInfo: IPageInfo = {
			pageIndex: 1,
			pageSize: 12,
		};

		await changePage(router, pageInfo);
		expect(navigationSpy).toHaveBeenCalledTimes(1);
		expect(navigationSpy).toHaveBeenCalledWith([], {
			queryParams: { pageIndex: pageInfo.pageIndex, pageSize: pageInfo.pageSize },
			queryParamsHandling: 'merge',
			replaceUrl: true,
		});
	});

	it('should set query parameters for sorting', async () => {
		expect(navigationSpy).toHaveBeenCalledTimes(0);

		const sortInfo: ISortInfo = {
			sortDirection: 'asc',
			sortKey: 'testing-key',
		};

		await changeSort(router, sortInfo);

		expect(navigationSpy).toHaveBeenCalledTimes(1);
		expect(navigationSpy).toHaveBeenCalledWith([], {
			queryParams: { sortDirection: sortInfo.sortDirection, sortKey: sortInfo.sortKey },
			queryParamsHandling: 'merge',
			replaceUrl: true,
		});
	});

	it('should create pagination observable with corresponding pagination information', async () => {
		expect(navigationSpy).toHaveBeenCalledTimes(0);
		let paginationValue = await createPaginationObservable(route).pipe(take(1)).toPromise();

		const pageInfo: IPageInfo = {
			pageIndex: 1,
			pageSize: 12,
		};

		await changePage(router, pageInfo);
		paginationValue = await createPaginationObservable(route).pipe(take(1)).toPromise();

		expect(navigationSpy).toHaveBeenCalledTimes(1);
		expect(paginationValue).not.toBe(null);
		expect(paginationValue).toEqual(pageInfo);
	});

	it('should create sorting observable with corresponding sorting information', async () => {
		expect(navigationSpy).toHaveBeenCalledTimes(0);
		let sortValue = await createSortObservable(route).pipe(take(1)).toPromise();

		const sortInfo: ISortInfo = {
			sortDirection: 'asc',
			sortKey: 'testing-key',
		};

		await changeSort(router, sortInfo);

		sortValue = await createSortObservable(route).pipe(take(1)).toPromise();

		expect(navigationSpy).toHaveBeenCalledTimes(1);
		expect(sortValue).not.toBe(null);
		expect(sortValue).toEqual(sortInfo);
	});

	it('should create filters observable with corresponding value', async () => {
		let filtersValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();
		expect(navigationSpy).toHaveBeenCalledTimes(0);
		const filter = {
			arrayQuery: ['foo', 'bar'],
			textQuery: 'baz',
			numberQuery: 42,
			objectQuery: { xyz: 'ijk' },
		};

		expect(filtersValue).toBe(null);

		await changeFilters(router, filter);

		filtersValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();
		expect(navigationSpy).toHaveBeenCalledTimes(1);
		expect(filtersValue).not.toBe(null);
	});

	it('should set custom filter observable value to null if filter is present but all options are empty', async () => {
		const callbacks = mockSubscribeCallbacks();

		createCustomFiltersObservable(route, router).subscribe(callbacks);
		expect(callbacks.next).toHaveBeenLastCalledWith(null);

		const filters = {
			arrayQuery: [],
			textQuery: '',
			numberQuery: undefined,
			objectQuery: undefined,
		};

		await changeFilters(router, filters);
		expect(callbacks.next).toHaveBeenLastCalledWith(null);
	});

	it('should set custom filter observable value to null if array filter is empty', async () => {
		const callbacks = mockSubscribeCallbacks();

		createCustomFiltersObservable(route, router).subscribe(callbacks);
		expect(callbacks.next).toHaveBeenLastCalledWith(null);

		const filters = {
			arrayQuery: [],
		};

		await changeFilters(router, filters);
		expect(callbacks.next).toHaveBeenLastCalledWith(null);
	});

	it('should set custom filter observable value to null if text filter is empty', async () => {
		const callbacks = mockSubscribeCallbacks();
		createCustomFiltersObservable(route, router).subscribe(callbacks);
		expect(callbacks.next).toHaveBeenLastCalledWith(null);

		const filters = {
			textQuery: '',
		};

		await changeFilters(router, filters);
		expect(callbacks.next).toHaveBeenLastCalledWith(null);
	});

	it('should set custom filter observable value to null if number filter is empty', async () => {
		const callbacks = mockSubscribeCallbacks();

		createCustomFiltersObservable(route, router).subscribe(callbacks);
		expect(callbacks.next).toHaveBeenLastCalledWith(null);

		const filters = {
			numberQuery: undefined,
		};

		await changeFilters(router, filters);
		expect(callbacks.next).toHaveBeenLastCalledWith(null);
	});

	it('should not set custom filter observable value to null if number filter is 0', async () => {
		const callbacks = mockSubscribeCallbacks();

		createCustomFiltersObservable(route, router).subscribe(callbacks);
		expect(callbacks.next).toHaveBeenLastCalledWith(null);

		const filters = {
			numberQuery: 0,
		};

		await changeFilters(router, filters);
		expect(callbacks.next).not.toHaveBeenLastCalledWith(null);
	});

	it('should set custom filter observable value to null if object filter is empty', async () => {
		const callbacks = mockSubscribeCallbacks();

		createCustomFiltersObservable(route, router).subscribe(callbacks);
		expect(callbacks.next).toHaveBeenLastCalledWith(null);

		const filters = {
			objectQuery: undefined,
		};

		await changeFilters(router, filters);
		expect(callbacks.next.mock.calls[callbacks.next.mock.calls.length - 1][0]).toBe(null);
	});

	it('should not set custom filter observable value to null if object filter is truthy', async () => {
		const callbacks = mockSubscribeCallbacks();

		createCustomFiltersObservable(route, router).subscribe(callbacks);
		expect(callbacks.next).toHaveBeenLastCalledWith(null);

		const filters = {
			objectQuery: { xyz: 'ijk' },
		};

		await changeFilters(router, filters);
		expect(callbacks.next.mock.calls[callbacks.next.mock.calls.length - 1][0]).not.toBe(null);
	});

	it('should use scoped query params for filters', async () => {
		const scopedFilters = 'scoped-filters';
		let filtersValue = await createCustomFiltersObservable(route, router, scopedFilters).pipe(take(1)).toPromise();
		expect(navigationSpy).toHaveBeenCalledTimes(0);
		const filter = {
			arrayQuery: ['foo', 'bar'],
			textQuery: 'baz',
			numberQuery: 42,
			objectQuery: { xyz: 'ijk' },
		};

		expect(filtersValue).toBe(null);

		await changeFilters(router, filter, scopedFilters);
		filtersValue = await createCustomFiltersObservable(route, router, scopedFilters).pipe(take(1)).toPromise();

		expect(route.snapshot.queryParamMap.get(scopedFilters)).toBeTruthy();
		expect(route.snapshot.queryParamMap.get(TableQueryParam.CUSTOM_FILTERS)).toBeFalsy();
		expect(filtersValue).not.toBe(null);

		expect(navigationSpy).toHaveBeenCalledTimes(1);
	});

	it('should set scoped custom filter observable value to null if filter is empty', async () => {
		const scopedFilters = 'scoped-filters';
		const callbacks = mockSubscribeCallbacks();

		createCustomFiltersObservable(route, router, scopedFilters).subscribe(callbacks);
		expect(callbacks.next).toHaveBeenLastCalledWith(null);

		const filters = {};

		await changeFilters(router, filters, scopedFilters);
		expect(callbacks.next).toHaveBeenLastCalledWith(null);
	});
});

function mockSubscribeCallbacks() {
	return { next: jest.fn(), complete: jest.fn(), error: jest.fn() };
}
