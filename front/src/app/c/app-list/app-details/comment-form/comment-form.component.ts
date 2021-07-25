import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { App } from 'src/app/i/app';
import { CommentService } from 'src/app/s/comment.service';
import { MessageService } from 'src/app/s/message.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  constructor(private _comment: CommentService, private _msg: MessageService) {}

  @Input() appObs: Observable<App>;

  form: FormGroup;
  app: App;

  ngOnInit(): void {
    this.appObs.subscribe((data) => (this.app = data));
    this.form = new FormGroup({
      rating: new FormControl(5, {
        validators: [Validators.required],
      }),
      title: new FormControl(),
      content: new FormControl(),
      AppId: new FormControl(),
    });
  }

  onSubmitCommentForm(): void {
    if (!this.form.valid) {
      this._msg.setMessage({ type: 'error', message: 'Form is invalid' });
      return;
    }
    this.form.get('AppId').setValue(this.app.id);
    this._comment.postComment(this.form.value).subscribe((data: any) => {
      if (data.error) {
        this._msg.setMessage({ type: 'error', message: data.message });
        return;
      }
      this._msg.setMessage({
        type: 'info',
        message: 'Thank you for your comment',
      });
      this.form.reset();
      this._comment.loadComments();
    });
  }
}
