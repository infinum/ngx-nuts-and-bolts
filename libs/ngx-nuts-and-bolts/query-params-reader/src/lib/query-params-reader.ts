import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

type PaginationInfo = {
	pageSize: number;
	pageNumber: number;
};

@Injectable({
	providedIn: 'root',
})
export class QueryParamReader<T> {
	private readonly activatedRoute = inject(ActivatedRoute);

	public read(): Partial<T> {
		const queryParams = this.activatedRoute.snapshot.queryParams;
		const result: Partial<T> = {};

		// TODO: all queryParams are strings. Figure out a way how to coerce them to the correct type. Maybe using some zod built-ins
		// Also, this is a very naive implementation. It doesn't handle nested objects, arrays, etc.
		// It's just a starting point for the discussion
		// There is no validation of the query params -> should we use some kind of validation library? e.g. zod ?
		for (const key in queryParams) {
			// eslint-disable-next-line no-prototype-builtins
			if (queryParams.hasOwnProperty(key)) {
				result[key as keyof T] = queryParams[key];
			}
		}

		return result;
	}

	public write(): void {
		// TODO: Implement write method for generic query params
	}
}

export function createQueryParamReader<T>(): () => QueryParamReader<T> {
	return () => new QueryParamReader<T>();
}

const injectPaginationReader = createQueryParamReader<PaginationInfo>();

class TestingComponent {
	private readonly paginationReader = injectPaginationReader();

	private readQueryParams() {
		this.paginationReader.read();
	}
}
