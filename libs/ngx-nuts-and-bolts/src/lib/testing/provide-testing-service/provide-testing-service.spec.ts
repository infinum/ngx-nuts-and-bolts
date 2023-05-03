import { Injectable, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, firstValueFrom, of } from 'rxjs';
import { ExtractPublic } from '../extract-public/extract-public.type';
import { provideTestingService } from './provide-testing-service';

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

describe('provideTestingService', () => {
	let serviceBeingTested: ServiceBeingTested;
	let authService: AuthTestingService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideTestingService(AuthService, AuthTestingService)],
		});

		serviceBeingTested = TestBed.inject(ServiceBeingTested);
		authService = TestBed.inject(AuthTestingService);
	});

	it(`should provide testing version of the service under real service's DI token to the component being tested`, () => {
		expect(serviceBeingTested.authService).toBeInstanceOf(AuthTestingService);
	});

	it(`should provide testing service under the real service's DI token`, () => {
		expect(TestBed.inject(AuthService)).toBeInstanceOf(AuthTestingService);
	});

	it(`should provide testing service under the testing service's DI token (for easier testing)`, () => {
		expect(authService).toBeInstanceOf(AuthTestingService);
	});

	it('should allow interaction with the testing service', async () => {
		let user = await firstValueFrom(serviceBeingTested.authService.user$);

		expect(user.name).toBe('Steve');

		const authTestingService = authService;

		authTestingService.setUser({ name: 'Bob' });

		user = await firstValueFrom(serviceBeingTested.authService.user$);

		expect(user.name).toBe('Bob');
	});
});
