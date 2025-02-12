import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  private readonly oidcSecurityService = inject(OidcSecurityService);

  constructor(private toastr: ToastrService) {}

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
    });
    this.oidcSecurityService
      .revokeAccessToken()
      .subscribe((result) => console.log(result));
  }
}
