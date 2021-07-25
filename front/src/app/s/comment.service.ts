import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../i/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private _http: HttpClient) {}

  /**
   * Comments observer
   */
  comments: Array<Comment> = null;
  commentsSubject: BehaviorSubject<Array<Comment>> = new BehaviorSubject(
    this.comments
  );
  commentsObs: Observable<Array<Comment>> = this.commentsSubject.asObservable();

  /**
   * Load / relaod all comments
   */
  loadComments(): void {
    this._http
      .get(environment.apiUrl + environment.endPoints.comment)
      .subscribe((data: Array<Comment>) => this.commentsSubject.next(data));
  }

  getAppComment(appId): Observable<Array<Comment>> {
    return this._http.get<Array<Comment>>(
      environment.apiUrl + environment.endPoints.comment + '/' + appId
    );
  }

  /**
   * Create a comment
   */
  postComment(comment: Comment): Observable<Array<Comment>> {
    return this._http.post<Array<Comment>>(
      environment.apiUrl + environment.endPoints.comment,
      comment
    );
  }
}
