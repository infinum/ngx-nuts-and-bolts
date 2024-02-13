import { Provider } from '@angular/core';

/**
 * @param realServiceCtor Will be used as DI token and should match the DI token used in the component being tested
 * @param testingServiceCtor This class will be provided under both realServiceCtor and testingServiceCtor tokens
 * @example
 * ```ts
 * class AuthService {
 *   ...
 * }
 *
 * class AuthTestingService implements ExtractPublic<AuthService> {
 *   ...
 * }
 *
 * class ComponentBeingTested {
 *   private readonly authService = inject(AuthService);
 * }
 *
 * let authTestingService: AuthTestingService;
 *
 * beforeEach(() => {
 *   TestBed.configureTestingModule({
 *     providers: [
 *       provideTestingService(AuthService, AuthTestingService),
 *     ]
 *   });
 *
 *   authTestingService = TestBed.inject(AuthTestingService);
 * });
 * ```
 */
export function provideTestingService<TReal, TTesting>(
	/* eslint-disable @typescript-eslint/no-explicit-any */
	realServiceCtor: new (...args: Array<any>) => TReal,
	testingServiceCtor: new (...args: Array<any>) => TTesting
	/* eslint-enable @typescript-eslint/no-explicit-any */
): Array<Provider> {
	return [
		{
			provide: realServiceCtor,
			useClass: testingServiceCtor,
		},
		{
			provide: testingServiceCtor,
			useExisting: realServiceCtor,
		},
	];
}
