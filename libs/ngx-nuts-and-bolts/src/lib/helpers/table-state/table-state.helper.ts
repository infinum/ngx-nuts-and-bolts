import { ActivatedRoute, Router } from '@angular/router';
import { isEqual } from 'lodash';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export type Sort = 'asc' | 'desc' | '';

export interface IPageInfo {
	pageIndex: number;
	pageSize: number;
	length?: number;
}

export interface ISortInfo {
	sortingKey: string;
	sortDirection: Sort;
}

export enum TableQueryParam {
	PAGE_INDEX = 'pageIndex',
	PAGE_SIZE = 'pageSize',
	SORT_KEY = 'sortKey',
	SORT_DIRECTION = 'sortDirection',
	CUSTOM_FILTERS = 'filters',
}

/**
 *
 * Creates observable that emits when page information in route changes.
 * @param {ActivatedRoute} route - Activated route instance used in component.
 * @param {IPageInfo} [fallbackPaginationInfo] - Fallback values for pagination info.
 */
export function createPaginationObservable(
	route: ActivatedRoute,
	fallBackPaginationInfo: IPageInfo = { pageIndex: 0, pageSize: 10 }
): Observable<IPageInfo> {
	return route.queryParamMap.pipe(
		map((paramMap) => {
			const pageIndex = parseInt(
				paramMap.get(TableQueryParam.PAGE_INDEX) ?? fallBackPaginationInfo.pageIndex.toString(),
				10
			);
			const pageSize = parseInt(
				paramMap.get(TableQueryParam.PAGE_SIZE) ?? fallBackPaginationInfo.pageSize.toString(),
				10
			);

			return {
				pageIndex,
				pageSize,
			};
		}),
		distinctUntilChanged(
			(pageEvent1, pageEvent2) =>
				pageEvent1.pageIndex === pageEvent2.pageIndex && pageEvent1.pageSize === pageEvent2.pageSize
		)
	);
}

/**
 *
 * Creates observable that emits when sorting information in route changes.
 * @param {ActivatedRoute} route - Activated route instance used in component.
 */
export function createSortingObservable(route: ActivatedRoute): Observable<ISortInfo> {
	return route.queryParamMap.pipe(
		map((paramMap) => {
			const sortingKey = paramMap.get(TableQueryParam.SORT_KEY) ?? '';
			const sortDirection = (paramMap.get(TableQueryParam.SORT_DIRECTION) ?? '') as Sort;

			return {
				sortingKey,
				sortDirection,
			};
		}),
		distinctUntilChanged(isEqual)
	);
}

/**
 *
 * Creates observable that emits when filtering information in route changes.
 * @param {ActivatedRoute} route - Activated route instance used in component.
 * @param {Router} router - Router instance used in component.
 */
export function createCustomFiltersObservable<TFilterValue extends Record<string, unknown> | null = null>(
	route: ActivatedRoute,
	router: Router
): Observable<TFilterValue | null> {
	return route.queryParamMap.pipe(
		map((queryParamMap) => {
			let filters = null;

			try {
				if (queryParamMap.has(TableQueryParam.CUSTOM_FILTERS)) {
					filters = JSON.parse(atob(queryParamMap.get(TableQueryParam.CUSTOM_FILTERS) || ''));
				}
			} catch (e) {
				console.error(e);
			}

			if (filters && isFilterEmpty(filters)) {
				clearFilters(router);
				return null;
			}

			return filters;
		}),
		distinctUntilChanged(isEqual)
	);
}

/**
 *
 * Creates query params with passed information about pagination.
 * @param {Router} router - Router instance used in component.
 * @param {IPageInfo} pageInfo - Object containing information about page size and page index
 */
export function onPageChangeHelper(router: Router, pageInfo: IPageInfo): void {
	router.navigate([], {
		replaceUrl: true,
		queryParamsHandling: 'merge',
		queryParams: {
			[TableQueryParam.PAGE_INDEX]: pageInfo.pageIndex || null,
			[TableQueryParam.PAGE_SIZE]: pageInfo.pageSize,
		},
	});
}

/**
 *
 * Creates query params with passed information about sorting.
 * @param {Router} router - Router instance used in component.
 * @param {ISortInfo} sortInfo - Object containing information about sorting key and direction
 */
export function onSortChangeHelper(router: Router, sort: ISortInfo): void {
	const sortDirection = sort.sortDirection || null;
	const sortKey = sortDirection ? sort.sortingKey : null;
	router.navigate([], {
		replaceUrl: true,
		queryParamsHandling: 'merge',
		queryParams: {
			[TableQueryParam.SORT_KEY]: sortKey,
			[TableQueryParam.SORT_DIRECTION]: sortDirection,
		},
	});
}

/**
 *
 * Creates query params and encodes them based on passed filter value.
 * @param {Router} router - Router instance used in component.
 * @param {TFilterValue} filterValue - Object containing properties used for filtering
 */
export function onFiltersChangeHelper<TFilterValue extends Record<string, unknown> | null = null>(
	router: Router,
	customFilters: TFilterValue
): void {
	let filters = null;
	try {
		filters = customFilters ? btoa(JSON.stringify(customFilters)) : null;
	} catch (e) {
		console.error(e);
	}

	router.navigate([], {
		replaceUrl: true,
		queryParamsHandling: 'merge',
		queryParams: {
			[TableQueryParam.CUSTOM_FILTERS]: filters,
			[TableQueryParam.PAGE_INDEX]: null,
		},
	});
}

function isFilterEmpty<TFilterValue extends Record<string, unknown> | null = null>(filterValue: TFilterValue): boolean {
	if (!filterValue) {
		return true;
	}

	const filterHasSomeValue = Object.values(filterValue).some((value) => {
		if (typeof value === 'string') {
			return Boolean(value);
		} else if (typeof value === 'number') {
			return value || value === 0;
		} else if (value instanceof Array) {
			return value.length;
		}

		return Boolean(value);
	});

	return !filterHasSomeValue;
}

function clearFilters(router: Router): void {
	router.navigate([], {
		replaceUrl: true,
		queryParamsHandling: 'merge',
		queryParams: {
			[TableQueryParam.CUSTOM_FILTERS]: null,
		},
	});
}
