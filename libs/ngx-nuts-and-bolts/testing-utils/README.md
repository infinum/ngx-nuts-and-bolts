# @infinum/ngx-nuts-and-bolts/testing-utils

Secondary entry point of `@infinum/ngx-nuts-and-bolts`. It can be used by importing from `@infinum/ngx-nuts-and-bolts/testing-utils`.

# `ExtractPublic`

Use `ExtractPublic` custom type when you want to extract public members of class. It could prove most useful when creating test doubles for your services or components[^1].
You might be wondering why you couldn't simply do

```ts
class UserTestingService implements UserService
```

Good question! Perhaps unexpectedly, that would require you to implement private and protected members of UserService as well as public members. You can find a more detailed explanation [here](https://github.com/Microsoft/TypeScript/issues/18499).

## 1. Usage

```ts
export class UserTestingService implements ExtractPublic<UserService>{
...
}
```

[^1]: Using this custom type with components could result in redundant code in test doubles since e.g. component could contain public methods used in templates which might be unnecessary in the testing double.

# `asyncData`

If and when returning mocked data from the testing service, users should avoid doing something like this:

```ts
public getData(data: TData): Observable<TData>{
	return of(data);
}
```

The example above creates an observable from the data but it [returns it synchronously](https://stackblitz.com/edit/rxjs-hx8yos?devtoolsheight=60). This isn't how services that make API calls behave in real world applications.
The purpose of creating test doubles for services is to mock the behavior of real world services as closely as possible. With that in mind, it is a good idea to fake the async behavior of such services. This can can be achieved in multiple ways.
This specific implementation uses `observeOn` operator with `asyncScheduler`, creating a new macrotask that places the observable in the event loop queue.

## 1. Usage

When returning the mock data in test doubles, simply wrap the data using `asyncData` function and the data will be returned asynchronously.

```ts
public getTestingData(data: TData): Observable<TData>{
	return asyncData(data);
}
```

# `asyncError`

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
export class MockedDataFetchingService {
  public getSomeData(data: TData): Observable<TData> {
    return data ? asyncData(data) : asyncError(new HttpErrorResponse({ error: { message: 'The data cannot be found' }, status: 404 }));
  }
}
```

### 1.2. Test suite scenario

```ts
describe('asyncError demo', () => {
	...
	it('should return not found error if data does not exist', () => {
		spyOn(mockService, 'mockMethod').and.returnValue(
			asyncError(new HttpErrorResponse({ error: { message: 'The data cannot be found' }, status: 404 }))
		);
	});
});
```

# `asyncData`

If and when returning mocked data from the testing service, users should avoid doing something like this:

```ts
public getData(data: TData): Observable<TData>{
	return of(data);
}
```

The example above creates an observable from the data but it [returns it synchronously](https://stackblitz.com/edit/rxjs-hx8yos?devtoolsheight=60). This isn't how services that make API calls behave in real world applications.
The purpose of creating test doubles for services is to mock the behavior of real world services as closely as possible. With that in mind, it is a good idea to fake the async behavior of such services. This can can be achieved in multiple ways.
This specific implementation uses `observeOn` operator with `asyncScheduler`, creating a new macrotask that places the observable in the event loop queue.

## 1. Usage

When returning the mock data in test doubles, simply wrap the data using `asyncData` function and the data will be returned asynchronously.

```ts
public getTestingData(data: TData): Observable<TData>{
	return asyncData(data);
}
```

# `MockStorage`

When you need to interact with storage but still you are testing only a unit of the code, you can use `MockStorage` class for this purpose. Mocked version doesn't take into account stuff like size limits and other things taken care by `window.localstorage API` and just focuses on core functionality.

## 1. Usage

```ts
let storage: Storage;

beforeEach(async () => {
  await TestBed.configureTestingModule({
    providers: [
      {
        provide: LOCAL_STORAGE,
        useClass: MockStorage,
      },
      {
        provide: SESSION_STORAGE,
        useClass: MockStorage,
      },
    ],
  });
  storage = TestBed.inject(Storage);
});
```
