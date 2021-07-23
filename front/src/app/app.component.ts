import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const socket = io('http://localhost:3000');
    socket.connect();
    socket.on('updateFileStatus', (socket) => {
      console.log(socket);
    });
  }
}
