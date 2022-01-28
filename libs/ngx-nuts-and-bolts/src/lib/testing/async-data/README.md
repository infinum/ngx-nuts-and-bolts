# Async data helper

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
