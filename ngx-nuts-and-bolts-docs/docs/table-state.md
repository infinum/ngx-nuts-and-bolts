---
id: table-state
title: Table state helpers
sidebar_label: Table state helpers
---

## 1. Introduction

Being able to take out the pagination, sorting and filtering information from the memory of the application alleviates some of the problems (link sharing, refreshing pages) which are present when saving that data in-memory. For this purpose, this library exposes functions which cover common use cases regarding table state manipulation.

## 2. Features

- Creation of pagination/sorting/filtering observables which enable consumers to react to pagination/sorting/filtering query parameter change events.
- Saving table state information (pagination/sorting/filtering) into the query parameters.

## 3. Usage

Helper functions can be used individually or, as the example below shows, with other helper functions and a little bit of RxJS magic which reacts and re-fethces data based on changes in any one of the passed observables.

```ts

import {isEqual} from 'loadsh';

interface ITemplateData{
	data: Data;
	tableState: ITableState;
}

interface ITableState{
	pagination: IPageInfo;
	sort: ISortInfo;
	filters: TFilterValue;
}

export class MyComponent extends LoadingStateComponent {
	public readonly templateData$ = this.createTemplateDataObservable();

	constructor(
		private readonly dataService: DataService,
		private readonly route: ActivatedRoute,
		private readonly router: Router
	) {}

	private createTemplateDataObservable(): Observable<ITemplateData> {
		const pagination$ = createPaginationObservable();
		const sort$ = createSortObservable();
		const filters$ = createFilteringObservable();

		const tableSate$ = combineLatest([pagination$, sort$, filters$]).pipe(
			debounceTime(500), // optional, might depend on the use case whether you want this or not
			distinctUntilChanged(isEqual) // recommended to prevent multiple emits for same navigation events
		);

		return combineLatest([tableState$, this.loadingTrigger$]).pipe(
			tap(() => {
				this._loading$.next(true);
			}),
			switchMap(([tableState]) => {
				return this.dataService.fetchPaginatedSortedFilteredData(tableState).pipe(
					map((data) => {
						return {
							data,
							tableState
						}
					})
				);
			})
			...
			finalize(() => {
				this._loading$.next(false);
			})
		);
	}
}
```

Setting of the query parameters is even simpler as shown in code snippets below. With little mapping, interfaces for pagination and sorting should be usable with most of the 3rd party out-of-the-box data table events. While `changeFilters()` function accepts generic object as filter value.

```ts
...
public onPageChange(event: PageEvent): void{
	const pageInfo: IPageInfo{
		pageIndex: event.pageIndex,
		pageSize: event.pageSize
	}

	changePage(this.router, pageInfo)
}
```

```ts
...
public onSortChange(event: SortEvent): void{
	const sortInfo: ISortInfo{
		sortDirection: event.direction,
		sortKey: event.key
	}

	changeSort(this.router, sortInfo)
}
```

```ts
...
public onFiltersChange(event: FilterEvent): void{
	changeFilters(this.router, event)
}
```
