import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponseDtoTs, User } from './auth.dto';
import { BehaviorSubject, delay, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string;
  constructor(protected http: HttpClient) {
    this.url = `${environment.HOST}/auth`;
  }
  private _currentUser = new BehaviorSubject<AuthResponseDtoTs | null>(
    this.decodeToken()
  );

  currentUser$ = this._currentUser.asObservable();

  router = inject(Router);

  login(email: string) {
    this.http.post(`${this.url}/login`, { email }).subscribe({
      next: (response: AuthResponseDtoTs) => {
        this.saveToken(response);
        this._currentUser.next(response);
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error('Login failed', error);
        this.removeToken();
        this._currentUser.next(null);
        this.router.navigateByUrl('/auth/login');
      },
    });
  }

  logout() {
    this.removeToken();
    this.router.navigateByUrl('/auth/login');
  }

  private saveToken(user: AuthResponseDtoTs) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private removeToken() {
    localStorage.removeItem('userData');
  }

  private decodeToken() {
    const userData = localStorage.getItem('userData');

    return userData ? JSON.parse(userData) : null;
  }
}
