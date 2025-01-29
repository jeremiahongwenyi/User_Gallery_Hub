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
  allAlbums:Album[]=[];
  isLoading:boolean=false;
  responseArrived:boolean=false

  ngOnInit(): void {
      this.subscribeUserAndAlbums()
  }

subscribeUserAndAlbums(){
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

onRowClicked(user){
  console.log('clicked');
  this.userService.emitUser(user.id);
  this.router.navigate(['/users'])
}

}
