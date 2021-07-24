import { Component, OnInit } from '@angular/core';
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
}
