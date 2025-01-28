import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  constructor(private userService:UserService){}

  allUsers:User[]=[];

  ngOnInit(): void {
      this.subscribeUser()
  }

subscribeUser(){
   this.userService.fetchUsers().subscribe({
    next:(resp)=>{
      console.log(resp);
      
      this.allUsers=resp
    },
    error:(err)=>{

    }
   })
}
}
