import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-callback',
  imports: [MatProgressSpinnerModule],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent implements OnInit {

  constructor(
    private userService: UserService
  ){
   
  }
  ngOnInit(): void {
    setTimeout(()=>{
      this.userService.registerUser(); 
    }, 5000)
   
    
  }
}
