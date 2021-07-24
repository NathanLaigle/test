import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { App } from '../i/app';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private _http: HttpClient, private _auth: AuthService) {}

  /**
   * Apps observer
   */
  apps: Array<App> = null;
  appsSubject: BehaviorSubject<Array<App>> = new BehaviorSubject(this.apps);
  appsObs: Observable<Array<App>> = this.appsSubject.asObservable();

  /**
   * Load / reload all apps
   */
  loadApps(): void {
    this._http
      .get<Array<App>>(environment.apiUrl + environment.endPoints.app)
      .subscribe((data) => {
        this.appsSubject.next(data);
      });
  }

  /**
   *
   * @param {App} app
   * @returns Observable<Array<App>>
   */
  postApp(app: FormData): Observable<Array<App>> {
    return this._http.post<Array<App>>(
      environment.apiUrl + environment.endPoints.app,
      app,
      this._auth.setHeader()
    );
  }
}
