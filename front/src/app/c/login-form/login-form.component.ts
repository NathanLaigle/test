import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/s/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(private _auth: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  @Output() close: EventEmitter<string> = new EventEmitter();
  @Output() open: EventEmitter<string> = new EventEmitter();

  form: FormGroup;

  errorMessage: string;

  onClose(): void {
    this.close.emit('app-login-form');
  }

  onOpen(openComponent: string) {
    this.open.emit(openComponent);
  }

  onLogin(): void {
    if (!this.form.valid) {
      this.errorMessage = 'Form is invalid';
      return;
    }
    this._auth.login(this.form.value).subscribe((data) => {
      if (data.error) {
        this.errorMessage = data.message + '. ' + data.error;
        return;
      }
      this.errorMessage = null;
      this._auth.setUser(data);
      this.form.reset();
      this.onClose();
    });
  }

  onCloseErrorMessage(): void {
    this.errorMessage = null;
  }
}
