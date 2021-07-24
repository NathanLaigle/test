import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

export interface Auth {
  token: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient, private _msg: MessageService) {}

  /**
   * Oberserver for user auth status
   */
  private userAuthStatus: boolean = this.isAuth();
  private userAuthStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    this.userAuthStatus
  );
  userAuthStatusObs: Observable<boolean> =
    this.userAuthStatusSubject.asObservable();

  /**
   *
   * @param token string : optional
   * @returns
   */
  setHeader(token: string = this.getUser()?.token) {
    return {
      headers: {
        Authorization: 'bearer ' + token,
      },
    };
  }

  /**
   *
   * @param data {email: string, password: string}
   * @returns Observable<string | { token: string; userId: string }>
   */
  login(data: { email: string; password: string }): Observable<any> {
    return this._http.post(environment.apiUrl + '/login', data);
  }

  logout(): void {
    this.userAuthStatusSubject.next(false);
    this._msg.setMessage({
      type: 'info',
      message: 'You have been disconnected',
    });
    localStorage.removeItem('auth');
  }

  /**
   * @param user Auth
   */
  setUser(user: Auth, opt?): void {
    localStorage.setItem('auth', JSON.stringify(user));
    this.userAuthStatusSubject.next(true);
    if (opt?.message !== false) {
      this._msg.setMessage({ type: 'info', message: 'You are logged in' });
    }
  }

  getUser(): Auth {
    return JSON.parse(localStorage.getItem('auth'));
  }

  isAuth(): boolean {
    return localStorage.getItem('auth') ? true : false;
  }
}
