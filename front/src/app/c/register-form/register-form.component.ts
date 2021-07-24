import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/s/auth.service';
import { MessageService } from 'src/app/s/message.service';
import { UserService } from 'src/app/s/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _user: UserService,
    private _msg: MessageService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
      pseudo: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  @Output() close: EventEmitter<string> = new EventEmitter();
  @Output() open: EventEmitter<string> = new EventEmitter();

  form: FormGroup;

  errorMessage: string;

  onRegister(): void {
    if (!this.form.valid) {
      this.errorMessage = 'Form is invalid';
      return;
    }
    this._user.postUser(this.form.value).subscribe((data) => {
      if (data.error) {
        this.errorMessage = data.message + '. ' + data.error;
        return;
      }
      this.errorMessage = null;
      this._msg.setMessage({
        type: 'info',
        message: 'Your account has been created',
      });
      this._auth.login(this.form.value).subscribe((data) => {
        this.errorMessage = null;
        this._auth.setUser(data, { message: false });
        this.form.reset();
        this.onClose();
      });
    });
  }

  onClose(): void {
    this.close.emit('app-register-form');
  }

  onOpen(openComponent: string) {
    this.open.emit(openComponent);
  }

  onCloseErrorMessage(): void {
    this.errorMessage = null;
  }
}
