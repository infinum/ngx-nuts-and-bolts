---
id: provide-testing-service
title: Provide testing service
sidebar_label: Provide testing service
---

During unit testing, we often provide mock/stub/testing versions of real services to the unit being tested. Unit being tested could be a component, service, pipe, etc. Testing versions of real services can have some useful methods that can be used to make writing individual unit tests easier.

`provideTestingService` makes providing and accessing testing versions of real services easier, in a type-safe way and without any manual type-casting.

## 1. Usage

Here is a quick example of how to use `provideTestingService` helper method:

```ts
let serviceBeingTested: ServiceBeingTested;
let authService: AuthTestingService;

beforeEach(() => {
	TestBed.configureTestingModule({
		providers: [provideTestingService(AuthService, AuthTestingService)],
	});

	serviceBeingTested = TestBed.inject(ServiceBeingTested);
	authService = TestBed.inject(AuthTestingService);
});

it('should react to user changes', async () => {
	// Arrange (+ initial state assertion)
	let user = await firstValueFrom(serviceBeingTested.authService.user$);
	expect(user.name).toBe('Steve');

	// Act
	authService.setUser({ name: 'John' }); // `setUser` exists only on `AuthTestingService` and not on `AuthService` and is a method that can be used for easier state setup in unit tests

	// Assert
	user = await firstValueFrom(serviceBeingTested.authService.user$);
	expect(user.name).toBe('John');
});
```

If you are interested in more details and reasoning, read on.

## 2. The problem we are trying to solve

Let's take a look at an example where we have `AuthService` that exposes `user$` observable. `AuthTestingService` must implement the public interface of `AuthService` (we will utilize [`ExtractPublic`](./extract-public.md) for that). It can be useful if `AuthTestingService` exposes `setUser` method that can be used for easier state setup in unit tests.

Here are our services:

```ts
interface IUser {
	name: string;
}

class AuthService {
	public user$: Observable<IUser> = of({ name: 'Steve' });
}

class AuthTestingService implements ExtractPublic<AuthService> {
	private readonly _user$ = new BehaviorSubject<IUser>({ name: 'Steve' });
	public user$ = this._user$.asObservable();

	public setUser(user: IUser): void {
		this._user$.next(user);
	}
}

@Injectable({
	providedIn: 'root',
})
class ServiceBeingTested {
	public readonly authService = inject(AuthService);
}
```

When we want to unit-test `ServiceBeingTested`, we must provide the testing versions of its dependencies. This is what makes it a unit test and not an integration test. In this example, the only dependency is `AuthService`.

In individual unit tests, we would like to call `setUser` method that exists only on `AuthTestingService` and the user change should be visible from `ServiceBeingTested`.

During `TestBed` setup, you could do something like this:

```ts
let serviceBeingTested: ServiceBeingTested;
let authService: AuthService;

beforeEach(() => {
	TestBed.configureTestingModule({
		providers: [
			{
				provide: AuthService,
				useClass: AuthTestingService,
			},
		],
	});

	serviceBeingTested = TestBed.inject(ServiceBeingTested);
	authService = TestBed.inject(AuthService);
});

it('should react to user changes', async () => {
	// Arrange (+ initial state assertion)
	let user = await firstValueFrom(serviceBeingTested.authService.user$);
	expect(user.name).toBe('Steve');

	// Act
	(authService as any).setUser({ name: 'John' }); // This is not nice (not type-safe and we have to use `any`)

	// Assert
	user = await firstValueFrom(serviceBeingTested.authService.user$);
	expect(user.name).toBe('John');
});
```

However, this is obviously not great, since we are using `any`.

An improvement could be done like this:

```ts
let serviceBeingTested: ServiceBeingTested;
let authService: AuthTestingService;

beforeEach(() => {
	TestBed.configureTestingModule({
		providers: [
			{
				provide: AuthService,
				useClass: AuthTestingService,
			},
		],
	});

	serviceBeingTested = TestBed.inject(ServiceBeingTested);
	authService = TestBed.inject(AuthService); // This does not work because of type mismatch between `AuthService` and `AuthTestingService`. Setting the generic type of `TestBed.inject` method manually results in the same type mismatch error
	authService = TestBed.inject(AuthService) as unknown as AuthTestingService; // This is _meh_
});

it('should react to user changes', async () => {
	// Arrange (+ initial state assertion)
	let user = await firstValueFrom(serviceBeingTested.authService.user$);
	expect(user.name).toBe('Steve');

	// Act
	authService.setUser({ name: 'John' }); // This is nice (type-safe and no `any`)

	// Assert
	user = await firstValueFrom(serviceBeingTested.authService.user$);
	expect(user.name).toBe('John');
});
```

This is better, but we have to do the tedious `as unknown as AuthTestingService` cast.

## 3. The solution

To avoid any manual type casting, we can use `provideTestingService` helper method.

`TestBed` setup is now simplified, like so:

```ts
TestBed.configureTestingModule({
	providers: [provideTestingService(AuthService, AuthTestingService)],
});
```

The first argument passed to `provideTestingService` is the real service's constructor and the second argument is the testing version.

What the helper does in this example is that it provides an instance of `AuthTestingService` under both `AuthTestingService` and `AuthService` injection tokens. This ensures that `ServiceBeingTested` will get the testing version of `AuthService` injected. Importantly, it also allows us to access the testing version of `AuthService` from the test itself, in a nicer way:

```ts
let serviceBeingTested: ServiceBeingTested;
let authService: AuthTestingService;

beforeEach(() => {
	TestBed.configureTestingModule({
		providers: [provideTestingService(AuthService, AuthTestingService)],
	});

	serviceBeingTested = TestBed.inject(ServiceBeingTested);
	authService = TestBed.inject(AuthTestingService); // Crucial part that makes the types match - you are injecting `AuthTestingService` instead of `AuthService`
});
```

Then in unit tests, you can access methods from `AuthTestingService` in a type-safe way and without any manual casting:

```ts
it('should react to user changes', async () => {
	// Arrange (+ initial state assertion)
	let user = await firstValueFrom(serviceBeingTested.authService.user$);
	expect(user.name).toBe('Steve');

	// Act
	authService.setUser({ name: 'John' }); // This is nice (type-safe and no `any`)

	// Assert
	user = await firstValueFrom(serviceBeingTested.authService.user$);
	expect(user.name).toBe('John');
});
```
