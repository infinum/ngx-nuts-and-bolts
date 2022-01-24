# Table state helpers

Being able to take out the pagination, sorting and filtering information from the memory of the application alleviates some of the problems (link sharing, refreshing pages) which are present when saving that data in-memory. For that purpose this library exposes functions which cover common use cases regarding table state manipulation.

## 1. Features

- Creation of pagination/sorting/filtering observables which enable consumers to react to pagination/sorting/filtering query paramater change events.
- Saving table state information (pagination/sorting/filtering) into the query parameters.

## 2. Usage

Helper functions can be used individually or as example below shows with other helper functions and a little bit of RxJS magic which then reacts and re-fethces data based on changes in any one of the passed observables.

```ts

interface ITemplateData{
	data: Data;
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
		const sort$ = createSortingObservable();
		const filters$ = createFilteringObservable();

		return combineLatest([pagination$, sort$, filters$, this.loadingTrigger$]).pipe(
			tap(() => {
				this._loading$.next(true);
			})
			switchMap(([pagination, sort, filters]) => {
				return this.dataService.fetchPaginatedSortedFilteredData(pagination, sort, filter).pipe(
					map((data) => {
						return {
							data,
							pagination,
							sort,
							filters
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

Setting of the query parameters is even simpler as shown in code snippets below. With little mapping, interfaces for pagination and sorting should be usable with most of the 3rd party out-of-the-box data table events. While `onFiltersChange()` function accepts generic object as filter value.

```ts
...
public onPageChange(event: PageEvent): void{
	const pageInfo: IPageInfo{
		pageIndex: event.pageIndex,
		pageSize: event.pageSize
	}

	onPageChangeHelper(this.router, pageInfo)
}
```

```ts
...
public onSortChange(event: SortEvent): void{
	const sortInfo: ISortInfo{
		sortDirection: event.direction,
		sortingKey: event.key
	}

	onSortChangeHelper(this.router, sortInfo)
}
```

```ts
...
public onFiltersChange(event: FilterEvent): void{
	onFiltersChangeHelper(this.router, event)
}
```
