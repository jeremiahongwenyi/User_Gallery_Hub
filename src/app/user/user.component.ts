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
  isLoading=false;
  responseArrived=false

  
        

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
  if (typeof window !== 'undefined' && window.localStorage){
    const selectedUser = localStorage.getItem('selectedUser')
    if (selectedUser){
      this.responseArrived=true;
      this.selectedUser = JSON.parse(selectedUser)

    } else {
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
  }  else {
    return;
  }
    
  }

  getAlbums(){
    this.isLoading=true;
    if(typeof window !== 'undefined' && window.localStorage){
      const userAlbums = localStorage.getItem('userAlbums')
      
      if(userAlbums){
        this.userAlbums=JSON.parse(userAlbums)
        this.isLoading= false;
        
      } else {
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
    } else {
      return;
    }
      
  }

onAlbumClicked(album:Album){
  this.userService.emitAlbum(album.id)
  this.router.navigate(['/albums'])
}

}
