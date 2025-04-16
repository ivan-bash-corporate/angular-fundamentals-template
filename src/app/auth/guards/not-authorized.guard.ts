import { Injectable } from '@angular/core';
import {AuthService} from "@app/auth/services/auth.service";
import {map, Observable, tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class NotAuthorizedGuard {
    constructor(private service: AuthService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.service.isAuthorised$.pipe(
            tap(isAuthorized => {
                if (isAuthorized) {
                    this.router.navigate(['/courses']);
                }
            }),
            map(isAuthorized => !isAuthorized)
        );
    }
}
