import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponseDtoTs, User, AuthDtoTs, RegisterUser } from './auth.dto';
import { BehaviorSubject, of, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string;
  private _currentUser = new BehaviorSubject<AuthResponseDtoTs | null>(
    this.decodeToken()
  );

  currentUser$ = this._currentUser.asObservable();

  router = inject(Router);

  constructor(private http: HttpClient) {
    this.url = `${environment.HOST}/auth`;
  }

  register(data: RegisterUser){
    return this.http.post<AuthResponseDtoTs>(`${this.url}/register`, data).pipe(
      tap((response) => {
        this.saveToken(response);
        console.log('Registration successful:', response);
        this._currentUser.next(response);
        this.router.navigateByUrl('/');
      })
    );
  }

  login(authDto: AuthDtoTs) {
    return this.http.post<AuthResponseDtoTs>(`${this.url}/login`, authDto).pipe(
      tap((response) => {
        this.saveToken(response);
        console.log('Login successful:', response);
        this._currentUser.next(response);
        this.router.navigateByUrl('/');
      })
    );
  }

  logout() {
    this.removeToken();
    this._currentUser.next(null);
    this.router.navigateByUrl('/auth/login');
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token'));
    }

    return this.http
      .post<AuthResponseDtoTs>(`${this.url}/refresh`, { refreshToken })
      .pipe(
        tap((response) => {
          this.saveToken(response);
          this._currentUser.next(response);
        })
      );
  }

  getAccessToken() {
    const user = this._currentUser.value;
    return user?.tokens.accessToken;
  }

  getRefreshToken() {
    const user = this._currentUser.value;
    return user?.tokens.refreshToken;
  }

  private saveToken(user: AuthResponseDtoTs) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private removeToken() {
    localStorage.removeItem('userData');
  }

  private decodeToken(): AuthResponseDtoTs | null {
    const userData = localStorage.getItem('userData');
    if (!userData) return null;

    const user: AuthResponseDtoTs = JSON.parse(userData);

    if (new Date(user.tokens.refreshTokenExpiry) < new Date()) {
      this.removeToken();
      return null;
    }

    return user;
  }
}
