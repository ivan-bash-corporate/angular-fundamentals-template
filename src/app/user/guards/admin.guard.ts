import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {map, Observable, tap} from "rxjs";
import {UserStoreService} from "@app/user/services/user-store.service";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard {
    constructor(private service: UserStoreService, private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.service.isAdmin$.pipe(
            tap(isAdmin => {
                if (!isAdmin) {
                    this.router.navigate(['/courses']);
                }
            }),
            map(isAdmin => isAdmin)
        );
    }
}
