import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
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
    selectedAlbum:Album[]=null;
    albumPhotos:Photo[]=[];
    isLoading=false;
    responseArrived=false

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
    if(typeof window !== 'undefined' && window.localStorage){
      const selectedAlbum = localStorage.getItem('selectedAlbum')
      const storedAlbum = selectedAlbum? JSON.parse(selectedAlbum) : null
      
      if(storedAlbum && storedAlbum[0].albumId == this.selectedAlbumId ){
        this.selectedAlbumId = storedAlbum[0].id 
        console.log(this.selectedAlbumId);
        
      }else {
        this.isLoading=true;
        this.userService.getAlbumWithId(this.selectedAlbumId).subscribe({
          next:(album)=>{
              this.selectedAlbum=[album]
              console.log(this.selectedAlbum);
              this.isLoading=false;
              
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

  getPhotos(){
    this.isLoading=true;
    if(typeof window !== 'undefined' && window.localStorage){
      const selectedAlbumPhotos = localStorage.getItem('selectedAlbumPhotos')
      const storedAlbumPhotos = selectedAlbumPhotos? JSON.parse(selectedAlbumPhotos) : null
      if(selectedAlbumPhotos && storedAlbumPhotos.length > 0 && storedAlbumPhotos[0].albumId == this.selectedAlbumId){
        this.albumPhotos=JSON.parse(selectedAlbumPhotos)
        this.isLoading= false;
        this.responseArrived=true
        } else {
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

}

}

