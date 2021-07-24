import { Component, Input, OnInit } from '@angular/core';
import { App } from 'src/app/i/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.scss'],
})
export class AppCardComponent implements OnInit {
  constructor() {}

  @Input() app: App;

  apiUrl: string = environment.apiUrl;

  ngOnInit(): void {}
}
