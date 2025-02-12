import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    SidebarComponent,
  RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  constructor(
    private router: Router
  ){
    this.router.navigateByUrl('/featured');
  }
  
  ngOnInit(): void {
    
  }
  

}
