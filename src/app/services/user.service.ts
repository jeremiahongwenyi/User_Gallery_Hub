import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, catchError, Observable, throwError, tap } from 'rxjs';
import { Album } from '../models/album';
import { Photo } from '../models/photo';
import { LoggingService } from './logging.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private loggingService: LoggingService
  ) { }

  private clickedUserId: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  $clickedUserId = this.clickedUserId.asObservable();

  private clickedAlbumId: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  $clickedAlbumId = this.clickedAlbumId.asObservable();
  apiUrl: string = environment.apiUrl;


  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      tap((users) => localStorage.setItem('users', JSON.stringify(users))),
      catchError(this.handleError.bind(this)) 
    );
  }

  fetchAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiUrl}/albums`).pipe(
      tap((albums) => localStorage.setItem('albums', JSON.stringify(albums))),
      catchError(this.handleError.bind(this))
    );
  }

  fetchPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiUrl}/photos`).pipe(
      tap((photos) => localStorage.setItem('photos', JSON.stringify(photos))),
      catchError(this.handleError.bind(this))
    );
  }

  getUserWithId(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users?id=${userId}`).pipe(
      tap((selectedUser) => localStorage.setItem('selectedUser', JSON.stringify(selectedUser))),
      catchError(this.handleError.bind(this))
    );
  }

  getAlbumsForUser(userId: number): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiUrl}/albums?userId=${userId}`).pipe(
      tap((userAlbums) => localStorage.setItem('userAlbums', JSON.stringify(userAlbums))),
      catchError(this.handleError.bind(this))
    );
  }

  getAlbumWithId(albumId: number): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/albums?id=${albumId}`).pipe(
      tap((selectedAlbum) => localStorage.setItem('selectedAlbum', JSON.stringify(selectedAlbum))),
      catchError(this.handleError.bind(this))
    );
  }

  getPhotosForAlbum(albumId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiUrl}/photos?albumId=${albumId}`).pipe(
      tap((selectedAlbumPhotos) => localStorage.setItem('selectedAlbumPhotos', JSON.stringify(selectedAlbumPhotos))),
      catchError(this.handleError.bind(this))
    );
  }

  emitUser(userId) {
    console.log('arrived');
    this.clickedUserId.next(userId);
  }

  emitAlbum(albumId) {
    this.clickedAlbumId.next(albumId);
  }

   
   private handleError(err:HttpErrorResponse) {
    console.log(err);
    const errorObj = { statusCode: err.status, errorMessage: err.message, datetime: new Date() };
    this.loggingService.logError(errorObj);
    return throwError(() => err);
  }
}


