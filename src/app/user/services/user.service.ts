import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "@shared/intarfaces/user.interface";
import {map, Observable} from "rxjs";
import {RequestResult} from "@app/auth/interfaces/request-result.interface";

const BASE_URL = 'http://localhost:4000';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private client: HttpClient) {}

    getUser(): Observable<User> {
        return this.client.get<RequestResult<User>>(`${BASE_URL}/users/me`).pipe(
            map((response: RequestResult<User>) => {
                if (response.successful) {
                    return response.result;
                } else {
                    throw new Error('Failed to fetch user data');
                }
            })
        );

    }
}
