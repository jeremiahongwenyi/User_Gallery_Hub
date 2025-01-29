import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Album } from '../models/album';
import { Router } from '@angular/router';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent implements OnInit{

  constructor(
      private userService:UserService,
      private router:Router
    ){}

    selectedAlbumId:number=null;
    selectedAlbum:Album=null;
    albumPhotos:Photo[]=[];
    isLoading:boolean=false;
    responseArrived:boolean=false

  ngOnInit(): void {
      this.userService.$clickedAlbumId.subscribe({
        next:(albumId)=>{
          this.selectedAlbumId=albumId
          this.getAlbum();
          this.getPhotos();
          
      },
      error:(err)=>{
        console.log(err);
        
      }
      })
  }

  getAlbum(){
    this.userService.getAlbumWithId(this.selectedAlbumId).subscribe({
        next:(album)=>{
            this.selectedAlbum=album
            console.log(this.selectedAlbum);
            
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }

  getPhotos(){
    this.isLoading=true;
      this.userService.getPhotosForAlbum(this.selectedAlbumId).subscribe({
        next:(photos)=>{
          this.albumPhotos=photos;
          this.isLoading = false;
          this.responseArrived = true;
          console.log(this.albumPhotos);
          
      },
      error:(err)=>{
        console.log(err);
        
      }
      })
  }

}



