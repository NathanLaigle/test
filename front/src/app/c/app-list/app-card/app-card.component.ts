import { Component, Input, OnInit } from '@angular/core';
import { App } from 'src/app/i/app';
import { User } from 'src/app/i/user';
import { UserService } from 'src/app/s/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.scss'],
})
export class AppCardComponent implements OnInit {
  constructor(private _user: UserService) {}

  @Input() app: App;

  apiUrl: string = environment.apiUrl;

  author: User;

  ngOnInit(): void {
    this._user
      .getOneUser(this.app.UserEmail)
      .subscribe((data) => (this.author = data));
  }
}
