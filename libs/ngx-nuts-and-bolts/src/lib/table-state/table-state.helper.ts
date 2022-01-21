import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export type Sort = 'asc' | 'desc' | '';
export interface IPageInfo {
	pageIndex: number;
	pageSize: number;
	totalItems?: number;
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

export function createPaginationObservable(route: ActivatedRoute): Observable<IPageInfo> {
	return route.queryParamMap.pipe(
		map((paramMap) => {
			const pageIndex = parseInt(paramMap.get(TableQueryParam.PAGE_INDEX) ?? '0', 10);
			const pageSize = parseInt(paramMap.get(TableQueryParam.PAGE_SIZE) ?? '10', 10);

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

export function createSortingObservable(route: ActivatedRoute): Observable<ISortInfo> {
	return route.queryParamMap.pipe(
		map((paramMap) => {
			const sortingKey = paramMap.get(TableQueryParam.SORT_KEY) ?? '';
			const sortDirection = (paramMap.get(TableQueryParam.SORT_DIRECTION) ?? '') as Sort;

			return {
				sortingKey,
				sortDirection,
			};
		}) // TODO: Check if last emitted and current object are equal.
	);
}

export function createCustomFiltersObservable<TFilterValue extends Record<string, unknown> | null = null>(
	route: ActivatedRoute
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
				// clearFilters(); // Should find a way how to pass router reference to this or use different approach for cleaning filters.
				return null;
			}

			return filters;
		})
		// distinctUntilChanged(isEqual) // Also how to check for equality
	);
}

function isFilterEmpty<TFilterValue extends Record<string, unknown> | null = null>(filterValue: TFilterValue): boolean {
	// Default implementation for empty filter check that is sufficient for most cases.
	// If there are some specific tables that need a stricter/different empty check,
	// those components can override this method as necessary.

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

export function onFiltersChange<TFilterValue extends Record<string, unknown> | null = null>(
	router: Router,
	customFilters: TFilterValue
): void {
	router.navigate([], {
		replaceUrl: true,
		queryParamsHandling: 'merge',
		queryParams: {
			[TableQueryParam.CUSTOM_FILTERS]: customFilters ? btoa(JSON.stringify(customFilters)) : null,
			[TableQueryParam.PAGE_INDEX]: null, // go to first page on filters change
		},
	});
}

export function clearFilters(router: Router): void {
	router.navigate([], {
		replaceUrl: true,
		queryParamsHandling: 'merge',
		queryParams: {
			[TableQueryParam.CUSTOM_FILTERS]: null,
		},
	});
}

export function setTableState(router: Router): void {
	console.log('router', router);
	router.navigate([], {
		replaceUrl: true,
		queryParamsHandling: 'merge',
		queryParams: {},
	});
}
