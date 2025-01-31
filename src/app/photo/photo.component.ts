import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent implements OnInit {

  constructor(private userService:UserService){}

  allPhotos:Photo[]=[];
  isEditMode = false;

  ngOnInit(): void {
      this.userService.getPhotos().subscribe({
        next: (photos) => {
        
        this.allPhotos = photos;
      }, error: (error) => {
        console.log(error)
      }})
  }

  editClicked(){
    // const data = { albumId:1, id:1,title: 'user photo',  url: 'assets/photo.jpg',thumbnailUrl:'assets/photo.jpg'}
    // this.userService.addPhoto(data)
    this.isEditMode=true;
  }

  submitClicked(){
    this.isEditMode= false
    const data:Photo = {albumId:this.allPhotos[0].albumId, id:this.allPhotos[0].id, title:'', url:this.allPhotos[0].url,thumbnailUrl:this.allPhotos[0].thumbnailUrl}
    this.userService.editPhoto(this.allPhotos[0].id, data).subscribe({
      next:(resp)=>{
         console.log(resp);
         this.userService.getPhotos().subscribe({
          next: (photos) => {
          
          this.allPhotos = photos;
        }, error: (error) => {
          console.log(error)
        }})
         
      },
      error: (err) => {
     console.log(err);
     
  }});;
  }
  }


