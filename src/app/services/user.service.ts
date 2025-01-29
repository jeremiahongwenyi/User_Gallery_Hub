import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Album } from '../models/album';
import { Photo } from '../models/photo';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient,
    private loggingService:LoggingService,
  ) { }

  private clickedUserId:BehaviorSubject<number> = new BehaviorSubject<number>(null);
   $clickedUserId = this.clickedUserId.asObservable()

   private clickedAlbumId:BehaviorSubject<number> = new BehaviorSubject<number>(null);
   $clickedAlbumId = this.clickedAlbumId.asObservable()


  fetchUsers():Observable<User[]>{
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(
      catchError((err)=>{
        console.log(err);
        const errorObj = {statusCode:err.status,errorMessage:err.message, datetime:new Date()}
        this.loggingService.logError(errorObj)
        return throwError(()=>{err})
      })
    )
  }

  fetchAlbums():Observable<Album[]>{
    return this.http.get<Album[]>('https://jsonplaceholder.typicode.com/albums').pipe(
      catchError((err)=>{
        console.log(err);
        const errorObj = {statusCode:err.status,errorMessage:err.message, datetime:new Date()}
        this.loggingService.logError(errorObj)
        return throwError(()=>{err})
      })
    )
  }

  fetchPhotos():Observable<Photo[]>{
    return this.http.get<Photo[]>('https://jsonplaceholder.typicode.com/photo').pipe(
      catchError((err)=>{
        console.log(err);
        const errorObj = {statusCode:err.status,errorMessage:err.message, datetime:new Date()}
        this.loggingService.logError(errorObj)
        return throwError(()=>{err})
      })
    )
  }

  getUserWithId(userId:number):Observable<User>{
      return  this.http.get<User>(`https://jsonplaceholder.typicode.com/users?id=${userId}`)
  }

  getAlbumsForUser(userId:number):Observable<Album[]>{
      return this.http.get<Album[]>(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
  }

  getAlbumWithId(albumId:number):Observable<Album>{
    return this.http.get<Album>(`https://jsonplaceholder.typicode.com/albums?id=${albumId}`)
}

  getPhotosForAlbum(albumId:number):Observable<Photo[]>{
  return this.http.get<Photo[]>(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
}

  emitUser(userId){
    console.log('arrived');
    this.clickedUserId.next(userId)
  }

  emitAlbum(albumId){
    this.clickedAlbumId.next(albumId)
  }
}
