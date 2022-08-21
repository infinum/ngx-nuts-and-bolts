import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentVariablesService } from '@infinumjs/ngx-nuts-and-bolts';
import { EnvironmentVariable } from '@ngx-nuts-and-bolts/environment-variables-example-app-base';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';

export interface IUser {
	id: string;
	name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly baseUrl = `${this.env.get(EnvironmentVariable.API_URL)}/user`;

	private readonly _user$ = new BehaviorSubject<IUser | null>(null);
	public readonly user$ = this._user$.asObservable();

	constructor(
		private readonly http: HttpClient,
		private readonly env: EnvironmentVariablesService<EnvironmentVariable>
	) {}

	public init() {
		return this.fetchUser().pipe(
			catchError(() => EMPTY),
			tap((user) => {
				this._user$.next(user);
			})
		);
	}

	public fetchUser(): Observable<IUser> {
		return this.http.get<IUser>(this.baseUrl);
	}
}
