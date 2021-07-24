import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/s/auth.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  constructor(public _auth: AuthService) {}

  userAuthStatus: boolean;

  ngOnInit(): void {
    this._auth.userAuthStatusObs.subscribe(
      (data) => (this.userAuthStatus = data)
    );
  }

  onShowSideBar(sideBar: string): void {
    const sideBarEl: HTMLElement = document.querySelector(sideBar);
    sideBarEl.style.right = sideBarEl.style.right == '0px' ? '-100%' : '0px';
  }

  onClose(e): void {
    this.onShowSideBar(e);
  }
}
