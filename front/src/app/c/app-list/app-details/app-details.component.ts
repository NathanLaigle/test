import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { App } from 'src/app/i/app';
import { Comment } from 'src/app/i/comment';
import { AuthService } from 'src/app/s/auth.service';
import { CommentService } from 'src/app/s/comment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss'],
})
export class AppDetailsComponent implements OnInit {
  constructor(private _comment: CommentService, private _auth: AuthService) {}

  @Input() appObs: Observable<App>;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  apiUrl: string = environment.apiUrl;

  app: App;

  comments: Array<Comment>;
  commentsCount: number;
  commentsAverage: number;

  commentFormState: boolean = false;

  userStatus: boolean;

  ngOnInit(): void {
    this.appObs.subscribe((data) => {
      this.app = data;
      this._comment
        .getAppComment(this.app?.id)
        .subscribe((data: Array<Comment>) => {
          this.comments = data;
          // Get comments data (average, number)
          this.commentsCount = this.comments.length;
          let totalRating = 0;
          this.comments.forEach((comment: Comment) => {
            totalRating += comment.rating;
          });
          this.commentsAverage = totalRating / this.commentsCount;
        });
    });
    this._auth.userAuthStatusObs.subscribe((data) => (this.userStatus = data));

    // reaload comments when a new one is added
    this._comment.commentsObs.subscribe(() => {
      this._comment
        .getAppComment(this.app?.id)
        .subscribe((data) => (this.comments = data));
    });
  }

  onClose() {
    this.close.emit();
    if (this.commentFormState) {
      this.onShowCommentForm();
    }
  }

  onShowCommentForm(): void {
    const formEl: HTMLElement = document.querySelector('.comment-form-box');
    if (formEl.style.maxHeight == '' || formEl.style.maxHeight == '0px') {
      formEl.style.maxHeight = formEl.scrollHeight + 'px';
      this.commentFormState = true;
    } else {
      formEl.style.maxHeight = '0px';
      this.commentFormState = false;
    }
  }
}
