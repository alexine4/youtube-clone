import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router:Router
  ){
   
  }
  ngOnInit(): void {
    this.userService.registerUser(); 
    this.router.navigateByUrl('')
  }
}
