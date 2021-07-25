import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { App } from 'src/app/i/app';
import { AppService } from 'src/app/s/app.service';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss'],
})
export class AppListComponent implements OnInit {
  constructor(private _app: AppService) {}

  apps: Array<App>;

  ngOnInit(): void {
    this._app.loadApps();
    this._app.appsObs.subscribe((data) => (this.apps = data));
  }

  app: App = null;
  appSubjet: BehaviorSubject<App> = new BehaviorSubject(this.app);
  appObs: Observable<App> = this.appSubjet.asObservable();

  onShowAppDetails(app?: App) {
    const appDetailsEl: HTMLElement = document.querySelector(
      '.app-details-container'
    );
    if (appDetailsEl.style.top == '') {
      appDetailsEl.style.top = '100%';
    }
    appDetailsEl.style.top = appDetailsEl.style.top == '100%' ? '0px' : '100%';
    if (app) {
      this.appSubjet.next(app);
    }
  }
}
