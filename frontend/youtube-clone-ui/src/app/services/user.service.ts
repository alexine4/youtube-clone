import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { WAIT_TIME } from '../shared/system.properties';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userId: string = '';
  constructor(
    private httpClient: HttpClient,
    private oidcSecurityService: OidcSecurityService,
    private cookieService: CookieService,
    private router: Router
  ) {}

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
    const expiresDate = new Date();
    expiresDate.setHours(expiresDate.getHours() + 24);

    this.httpClient
      .get('/api/user/register', { responseType: 'text' })
      .pipe(delay(WAIT_TIME))
      .subscribe({next: (userId) => {
        this.cookieService.set('userId', userId, expiresDate, '/');
        this.userId = userId;
        
      },
      complete:()=>{
        this.router.navigateByUrl('/featured');
      }
    });
  }

  getUserId(): string {
    if (this.userId === '') {
      this.userId = this.cookieService.get('userId');
    }
    return this.userId;
  }
}
