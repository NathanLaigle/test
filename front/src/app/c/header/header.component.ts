import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/s/auth.service';
import { UserService } from 'src/app/s/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private _user: UserService, private _auth: AuthService) {}

  userPseudo: string;

  ngOnInit(): void {
    this._auth.userAuthStatusObs.subscribe((data) => {
      if (data) {
        this._user
          .getOneUser()
          .subscribe((data) => (this.userPseudo = data.pseudo));
      } else {
        this.userPseudo = null;
      }
    });
  }
}
