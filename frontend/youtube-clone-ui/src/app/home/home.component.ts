import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        MatSidenavModule,
        SidebarComponent,
        RouterModule,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  constructor(
    public userService: UserService,
    private router: Router
  ){
    this.router.navigateByUrl('/featured');
  }
  
  ngOnInit(): void {
    
  }
  

}
