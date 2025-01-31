import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent implements OnInit {

  constructor(private userService: UserService) {}

  allPhotos: Photo[] = [];
  isEditMode = false;
  newTitle = '';

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem('Authuser')&& localStorage.getItem('allPhotos')) {
        this.allPhotos = JSON.parse(localStorage.getItem('allPhotos')!);
        console.log('good');
        console.log(this.allPhotos);
        
        
      } else {
        console.log('bad');
        
        this.userService.getPhotos().subscribe({
          next: (photos) => {
            localStorage.setItem('allPhotos', JSON.stringify(photos));
            this.allPhotos = photos;
            this.newTitle = this.allPhotos[0].title;
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    } else {
      return;
    }
  }

  editClicked() {
    this.isEditMode = true;
  }

  submitClicked() {
    this.isEditMode = false;
    const data: Photo = {
      albumId: this.allPhotos[0].albumId,
      id: this.allPhotos[0].id,
      title: this.newTitle,
      url: this.allPhotos[0].url,
      thumbnailUrl: this.allPhotos[0].thumbnailUrl
    };
    this.userService.editPhoto(this.allPhotos[0].id, data).subscribe({
      next: (resp: Photo) => {
        console.log(resp);
        this.allPhotos[0] = resp;
        this.newTitle=resp.title
        localStorage.setItem('allPhotos', JSON.stringify(this.allPhotos));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
