import { Injectable } from '@angular/core';
import { SessionStorageService } from '@app/auth/services/session-storage.service';
import { User } from '@shared/intarfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs';
import { RequestResult } from '@app/auth/interfaces/request-result.interface';
import {Router} from "@angular/router";

const BASE_URL = 'http://localhost:4000';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private isAuthorized$$ = new BehaviorSubject<boolean>(this.storageService.getToken() !== null);
    public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

    constructor(
        private storageService: SessionStorageService,
        private client: HttpClient,
        private router: Router,
    ) {}

    login( email: string, password: string): Observable<string | null> {
        let body = {
            email: email,
            password: password,
        }

        return this.client.post<RequestResult<string>>(`${BASE_URL}/login`, body).pipe(
            map((response) => {
                if (response.successful && response.result) {
                    this.storageService.setToken(response.result);
                    this.isAuthorised = true;
                    return null;
                }
                return response.errors.join(', ') || 'Login failed';
            }),
            catchError(() => of('Login error occurred'))
        );
    }

    logout(): void {
        this.client.delete(`${BASE_URL}/logout`).subscribe(() => {
            this.storageService.deleteToken();
            this.isAuthorised = false;
            this.router.navigate(['/login']);
        });
    }

    register(user: User): Observable<string | null> {
        return this.client.post<RequestResult<string>>(`${BASE_URL}/register`, user).pipe(
            map((response) => {
                if (response.successful) {
                    return null;
                }
                return response.errors.join(', ') || 'Registration failed';
            }),
            catchError(() => of('Registration error occurred'))
        );
    }

    get isAuthorised(): boolean {
        return this.isAuthorized$$.getValue();
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    get isAuthorised$(): Observable<boolean> {
        return this.isAuthorized$;
    }

    getLoginUrl(): string {
        return `${BASE_URL}/login`;
    }
}
