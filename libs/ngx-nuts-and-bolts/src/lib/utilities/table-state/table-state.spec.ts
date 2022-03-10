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

	it('should return sorting info after page sort info change', async () => {
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

	it('should return filters', async () => {
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
		let filterValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();
		expect(filterValue).toBe(null);

		const filters = {
			arrayQuery: [],
			textQuery: '',
			numberQuery: undefined,
			objectQuery: undefined,
		};

		await changeFilters(router, filters);

		filterValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();
		expect(filterValue).toBe(null);
	});

	it('should set custom filter observable value to null if array filter is empty', async () => {
		let filterValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();
		expect(filterValue).toBe(null);

		const filters = {
			arrayQuery: [],
		};

		await changeFilters(router, filters);

		filterValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();

		expect(filterValue).toBe(null);
	});

	it('should set custom filter observable value to null if text filter is empty', async () => {
		let filterValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();
		expect(filterValue).toBe(null);

		const filters = {
			textQuery: '',
		};

		await changeFilters(router, filters);

		filterValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();

		expect(filterValue).toBe(null);
	});

	it('should set custom filter observable value to null if number filter is empty', async () => {
		let filterValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();
		expect(filterValue).toBe(null);

		const filters = {
			numberQuery: undefined,
		};

		await changeFilters(router, filters);

		filterValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();

		expect(filterValue).toBe(null);
	});

	it('should not set custom filter observable value to null if number filter is 0', async () => {
		let filterValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();
		expect(filterValue).toBe(null);

		const filters = {
			numberQuery: 0,
		};

		await changeFilters(router, filters);

		filterValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();

		expect(filterValue).not.toBe(null);
	});

	it('should set custom filter observable value to null if object filter is empty', async () => {
		let filterValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();
		expect(filterValue).toBe(null);

		const filters = {
			objectQuery: undefined,
		};

		await changeFilters(router, filters);

		filterValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();

		expect(filterValue).toBe(null);
	});

	it('should not set custom filter observable value to null if object filter is truthy', async () => {
		let filterValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();
		expect(filterValue).toBe(null);

		const filters = {
			objectQuery: { xyz: 'ijk' },
		};

		await changeFilters(router, filters);

		filterValue = await createCustomFiltersObservable(route, router).pipe(take(1)).toPromise();

		expect(filterValue).not.toBe(null);
	});
});
