import { Injectable } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { UserService } from '@app/user/services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@shared/intarfaces/user.interface';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private name$$ = new BehaviorSubject<string | null>(null);
    private isAdmin$$ = new BehaviorSubject<boolean>(false);

    public name$: Observable<string | null> = this.name$$.asObservable();
    public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {
        this.authService.isAuthorized$.subscribe(isAuth => {
            if (isAuth) {
                this.getUser();
            } else {
                this.clearUser();
            }
        });
    }

    getUser(): void {
        if (!this.authService.isAuthorised) {
            return;
        }

        this.userService.getUser().pipe(
            tap((user: User) => {
                this.name$$.next(user.name ?? null);
                this.isAdmin$$.next(user.role === 'admin');
                console.log('UserStoreService: User fetched', user);
            })
        ).subscribe();
    }

    clearUser(): void {
        this.name$$.next(null);
        this.isAdmin$$.next(false);
    }
}
