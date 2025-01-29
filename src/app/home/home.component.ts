import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Album } from '../models/album';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private userService:UserService,
    private router:Router
  ){}

  allUsers:User[]=[];
  users:User[]=[]
  allAlbums:Album[]=[];
  isLoading = false;
  responseArrived = false

  ngOnInit(): void {
      this.subscribeUserAndAlbums()
  }

subscribeUserAndAlbums(){
 
   if (typeof window !== 'undefined' && window.localStorage){
        const storedUsers = localStorage.getItem('users');
        const storedAlbums = localStorage.getItem('albums') 
        if (storedUsers !== null && storedAlbums!==null) {
          this.allAlbums = JSON.parse(storedAlbums);
          this.users = JSON.parse(storedUsers)
          this.allUsers = this.users.map(user => {
            return {
              ...user,
              albumCount: this.allAlbums.filter(album => album.userId === user.id).length
            };
        })
        console.log(this.allUsers);
        console.log('it is working');
        this.isLoading=false;
        this.responseArrived = true;
      }
        else {
          this.isLoading=true;
          forkJoin([
            this.userService.fetchUsers(),
            this.userService.fetchAlbums()
          ]).subscribe({
            next:([users,albums])=>{
              this.allUsers = users.map(user => {
                return {
                  ...user,
                  albumCount: albums.filter(album => album.userId === user.id).length
                };
              });
              this.allAlbums = albums;
              this.isLoading = false;
              this.responseArrived = true;
              console.log(this.allUsers);
              
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

onRowClicked(user){
  console.log('clicked');
  this.userService.emitUser(user.id);
  this.router.navigate(['/users'])
}

}
