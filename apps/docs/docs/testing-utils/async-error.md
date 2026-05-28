---
id: async-error
title: Async error
sidebar_label: Async error
---

If and when returning mocked error from the testing service or in tests, users should avoid doing something like this:

```ts
public getData(data: TData): Observable<TData>{
	if(!data){
		return of(throwError(new HttpErrorResponse({ error: { message: 'The data cannot be found' }, status: 404 })));
	}
	...
}
```

or

```ts
describe('synchronous error throwing', () => {
	...
	it('should return not found error if data does not exist', () => {
		spyOn(mockService, 'mockMethod').and.returnValue(of(new HttpErrorResponse({ error: { message: 'The data cannot be found' }, status: 404 })));
		);
	});
});

```

The examples above throw observable errors but it [returns them synchronously](https://stackblitz.com/edit/rxjs-hx8yos?devtoolsheight=60). This isn't how services that make API calls behave in real world applications.
The purpose of creating test doubles for services or simulating async behavior directly in test suits is to mock the behavior of real world services as closely as possible. This can can be achieved in multiple ways.
This specific implementation uses `observeOn` operator with `asyncScheduler`, creating a new macrotask that places the observable in the event loop queue.

## 1. Usage

When returning the mocked error in test suites or test doubles, simply wrap the error data using `asyncError` function and the error will be returned asynchronously.

### 1.1. Test double scenario

```ts
import { asyncData, asyncError } from '@infinum/ngx-nuts-and-bolts/testing-utils';

export class MockedDataFetchingService {
	public getSomeData(data: TData): Observable<TData> {
		return data
			? asyncData(data)
			: asyncError(new HttpErrorResponse({ error: { message: 'The data cannot be found' }, status: 404 }));
	}
}
```

### 1.2. Test suite scenario

```ts
import { asyncError } from '@infinum/ngx-nuts-and-bolts/testing-utils';

describe('asyncError demo', () => {
	...
	it('should return not found error if data does not exist', () => {
		spyOn(mockService, 'mockMethod').and.returnValue(
			asyncError(new HttpErrorResponse({ error: { message: 'The data cannot be found' }, status: 404 }))
		);
	});
});
```
