import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/i/comment';
import { User } from 'src/app/i/user';
import { UserService } from 'src/app/s/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  constructor(private _user: UserService) {}

  @Input() comment: Comment;

  user: User;

  ngOnInit(): void {
    this._user
      .getOneUser(this.comment.UserEmail)
      .subscribe((data) => (this.user = data));
  }
}
