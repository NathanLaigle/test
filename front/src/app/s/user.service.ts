import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../i/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient, private _auth: AuthService) {}

  getUsers(): Observable<User> {
    return this._http.get<User>(
      environment.apiUrl + environment.endPoints.user
    );
  }

  getOneUser(): Observable<User> {
    return this._http.get<User>(
      environment.apiUrl +
        environment.endPoints.user +
        '/' +
        this._auth.getUser()?.email,
      this._auth.setHeader()
    );
  }

  postUser(user: User): Observable<any> {
    return this._http.post(
      environment.apiUrl + environment.endPoints.user,
      user
    );
  }
}
