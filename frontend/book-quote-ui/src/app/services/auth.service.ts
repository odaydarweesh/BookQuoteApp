// src/app/services/auth.service.ts 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // apiUrlAuth = https://.../api/Auth
    private apiUrl = environment.apiUrlAuth;

    constructor(private http: HttpClient) { }

    login(credentials: { email: string; password: string }): Observable<any> {
        //  https://.../api/Auth/login
        return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
            tap((response: any) => {
                if (response && response.token) {
                    localStorage.setItem('token', response.token);
                }
            })
        );
    }

    register(user: any): Observable<any> {
        //  https://.../api/Auth/register
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}
