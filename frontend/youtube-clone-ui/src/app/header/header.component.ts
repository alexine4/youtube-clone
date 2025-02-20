import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        RouterModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  
  isAuthenticated: boolean = false;

  private readonly oidcSecurityService = inject(OidcSecurityService);
  constructor(
    private userService:UserService,
    private cookieService: CookieService
  ){}

  ngOnInit(): void {  
  
    this.oidcSecurityService.checkAuth().subscribe((authData) => {
      this.isAuthenticated = authData.isAuthenticated;
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => {
      this.isAuthenticated = false;
      this.cookieService.delete('userId','/')
    });
    this.oidcSecurityService
      .revokeAccessToken()
      .subscribe((result) => console.log(result));
  }

  toggleSideBar() {

    this.userService.menuStatus = !this.userService.menuStatus
    
    
    }
}
