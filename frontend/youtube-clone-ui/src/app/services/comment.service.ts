import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Comment } from '../interfaces/comment';
import { WAIT_TIME } from '../shared/system.properties';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  postComment(comment: any, videoId: string): Observable<any> {
    return this.httpClient
      .post<any>('/api/video/' + videoId + '/comment', comment)
      .pipe(delay(WAIT_TIME));
  }

  getAllComments(videoId: string): Observable<Comment[]> {
    return this.httpClient
      .get<Comment[]>('/api/video/' + videoId + '/comment')
      .pipe(delay(WAIT_TIME + 2000));
  }
}
