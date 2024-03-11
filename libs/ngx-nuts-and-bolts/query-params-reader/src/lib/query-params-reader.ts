import { inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { z } from 'zod';

// TODO: Revisit this type extension
export class QueryParamReader<T extends Params> {
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly router = inject(Router);

	constructor(private readonly schema: z.ZodTypeAny) {}

	public read(): T {
		const queryParams = this.activatedRoute.snapshot.queryParamMap;
		const result: { [key: string]: any } = {};

		for (const key in this.schema) {
			const queryParam = queryParams.get(key);
			if (queryParam) {
				result[key] = queryParam;
			}
		}

		console.log(result);
		return result as T;
	}

	public write(paramData: T): void {
		this.router.navigate([], {
			queryParams: paramData,
			queryParamsHandling: 'merge',
			skipLocationChange: true,
		});
	}
}

export function createQueryParamReader<T extends z.ZodTypeAny>(schema: T): () => QueryParamReader<z.infer<T>> {
	return () => new QueryParamReader<T>(schema);
}

// const injectPaginationReader = createQueryParamReader<PaginationInfo>();
const injectPaginationReader = createQueryParamReader(z.object({ pageSize: z.number(), pageNumber: z.number() }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TestingComponent {
	private readonly paginationReader = injectPaginationReader();

	private readQueryParams() {
		this.paginationReader.read();
	}
}
