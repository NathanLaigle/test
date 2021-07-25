import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { App } from 'src/app/i/app';
import { Comment } from 'src/app/i/comment';
import { CommentService } from 'src/app/s/comment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss'],
})
export class AppDetailsComponent implements OnInit {
  constructor(private _comment: CommentService) {}

  @Input() appObs: Observable<App>;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  apiUrl: string = environment.apiUrl;

  app: App;

  comments: Array<Comment>;
  commentsCount: number;
  commentsAverage: number;

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
  }

  onClose() {
    this.close.emit();
  }
}
