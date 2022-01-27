# Async data helper

If and when returning mocked data from the testing service, users should avoid doing something like this:

```ts
public getData(data: TData): Observable<TData>{
	return of(data);
}
```

Above example creates observable from the data but it returns it synchronously which isn't how the services that make API calls behave in real world applications.
The purpose of creating test doubles for services is to mock real world services behavior as much as possible, so with that in mind it is good idea to fake the async behavior of such services, which can be achieved in multiple ways.
This specific implementation of helper uses `observeOn` operator which applies `asyncScheduler` which creates new macrotask and puts it next in event loop queue.

## 1. Usage

In service test double just call `asyncData` function with the mocked data you want to return asynchronously.

```ts
public getTestingData(data: TData): Observable<TData>{
	return asyncData(data);
}
```
