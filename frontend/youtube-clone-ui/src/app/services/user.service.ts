import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { WAIT_TIME } from '../shared/system.properties';
import { D } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userId: string = ''
  constructor(private httpClient: HttpClient) {}

  subscribeToUser(userId: string): Observable<boolean> {
    return this.httpClient
      .patch<boolean>(`/api/user/subscribe/${userId}`, null)
      .pipe(delay(WAIT_TIME));
  }

  unSubscribeToUser(userId: string): Observable<boolean> {
    return this.httpClient
      .patch<boolean>(`/api/user/unSubscribe/${userId}`, null)
      .pipe(delay(WAIT_TIME));
  }

  registerUser() {
     this.httpClient
      .get('/api/user/register', {responseType: "text"})
      .pipe(delay(WAIT_TIME))
      .subscribe(data=>{
      this.userId = data
        
      })
  }

  getUserId(): string{
    return this.userId
  }
}
