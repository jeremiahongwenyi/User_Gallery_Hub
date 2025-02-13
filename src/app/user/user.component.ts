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
        next: (userId) => {
          if (userId) {  // Only proceed if we have a userId
            this.selectedUserId = userId;
            console.log(this.selectedUserId);
            this.getUser();
            this.getAlbums();
          }
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }

  getUser(){   
  if (typeof window !== 'undefined' && window.localStorage){
    const selectedUser = localStorage.getItem('selectedUser')
    const storedUser = selectedUser ? JSON.parse(selectedUser) : null;
    console.log(storedUser);
    if (storedUser && storedUser[0].id === this.selectedUserId){
      this.responseArrived=true;
      this.selectedUser = storedUser
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
      const storedAlbums = userAlbums ? JSON.parse(userAlbums) : null;
      
      if(storedAlbums && storedAlbums.length > 0 && storedAlbums[0].userId === this.selectedUserId) {
        this.userAlbums=storedAlbums
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
