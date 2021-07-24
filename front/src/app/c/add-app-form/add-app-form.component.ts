import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/s/app.service';
import { MessageService } from 'src/app/s/message.service';

@Component({
  selector: 'app-add-app-form',
  templateUrl: './add-app-form.component.html',
  styleUrls: ['./add-app-form.component.scss'],
})
export class AddAppFormComponent implements OnInit {
  constructor(private _app: AppService, private _msg: MessageService) {}

  @Output() close: EventEmitter<string> = new EventEmitter();

  form: FormGroup;

  file: File;

  image: File;

  errorMessage: string;

  ngOnInit(): void {
    this.form = new FormGroup({
      app: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
      name: new FormControl(null, {
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onUploadApp(): void {
    if (!this.form.valid) {
      this.errorMessage = 'Form is invalid';
      return;
    }

    const upload = new FormData();
    upload.append('name', this.form.get('name').value);
    upload.append('description', this.form.get('description').value);
    upload.append('app', this.file, this.file.name);
    upload.append('image', this.image, this.image.name);

    this._app.postApp(upload).subscribe((data: any) => {
      if (data.error) {
        this.errorMessage = data.message + '. ' + data.error;
      }
      this._msg.setMessage({
        type: 'info',
        message: data.app.name + ' has been uploaded',
      });
      this.onClose();
      this._app.loadApps();
    });
  }

  onCloseErrorMessage(): void {
    this.errorMessage = null;
  }

  onClose(): void {
    this.close.emit('app-add-app-form');
  }

  onLoadFile(e): void {
    const reader: FileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        this.file = e.target.files[0];
      };
    }
  }

  onLoadImage(e): void {
    const reader: FileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        this.image = e.target.files[0];
      };
    }
  }
}
