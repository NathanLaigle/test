import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { AppService } from './s/app.service';
import { UserService } from './s/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _app: AppService) {}

  ngOnInit(): void {
    const socket = io('http://localhost:3000');
    socket.connect();
    socket.on('updateFileStatus', (socket) => {
      console.log('file security updated');
      this._app.loadApps();
    });
  }
}
