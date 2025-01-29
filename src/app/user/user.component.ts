import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Album } from '../models/album';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  constructor(
    private userService:UserService,
    private router:Router
  ){}

  selectedUserId:number=null
  selectedUser:User=null;
  userAlbums:Album[]=[];
  isLoading:boolean=false;
  responseArrived:boolean=false

  
        

  ngOnInit(): void {
      this.userService.$clickedUserId.subscribe({
        next:(userId)=>{
            this.selectedUserId=userId
            console.log(this.selectedUserId);
            this.getUser();
            this.getAlbums();
            
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }

  getUser(){
    this.userService.getUserWithId(this.selectedUserId).subscribe({
        next:(user)=>{
            this.selectedUser=user
            console.log(this.selectedUser);
            
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }

  getAlbums(){
    this.isLoading=true;
      this.userService.getAlbumsForUser(this.selectedUserId).subscribe({
        next:(albums)=>{
          this.userAlbums=albums;
          this.isLoading = false;
          this.responseArrived = true;
          console.log(this.userAlbums);
          
      },
      error:(err)=>{
        console.log(err);
        
      }
      })
  }

onAlbumClicked(album:Album){
  this.userService.emitAlbum(album.id)
  this.router.navigate(['/albums'])
}

}
