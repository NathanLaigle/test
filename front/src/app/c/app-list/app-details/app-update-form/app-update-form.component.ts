import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { App } from 'src/app/i/app';
import { AppService } from 'src/app/s/app.service';
import { MessageService } from 'src/app/s/message.service';

@Component({
  selector: 'app-app-update-form',
  templateUrl: './app-update-form.component.html',
  styleUrls: ['./app-update-form.component.scss'],
})
export class AppUpdateFormComponent implements OnInit {
  constructor(private _msg: MessageService, private _app: AppService) {}

  @Input() appObs: Observable<App>;
  @Output() appChange: EventEmitter<App> = new EventEmitter();

  app: App;

  form: FormGroup;

  ngOnInit(): void {
    this.appObs.subscribe((data) => {
      this.app = data;
      this.form = new FormGroup({
        id: new FormControl(data?.id),
        name: new FormControl(data?.name, {
          validators: [Validators.required],
        }),
        description: new FormControl(data?.description, {
          validators: [Validators.required],
        }),
      });
    });
  }

  onSubmitUpdateForm() {
    if (!this.form.valid) {
      this._msg.setMessage({ type: 'error', message: 'Form is invalid' });
      return;
    }
    this._app.updateApp(this.form.value).subscribe((data: any) => {
      if (data.error) {
        this._msg.setMessage({
          type: 'error',
          message: data.message,
        });
        return;
      }
      this._app.loadApps();
      this._app.appsObs.subscribe((data) => {
        this.appChange.emit(data.find((app) => app.id == this.app?.id));
        this._msg.setMessage({
          type: 'info',
          message: 'App updated',
        });
      });
    });
  }
}
