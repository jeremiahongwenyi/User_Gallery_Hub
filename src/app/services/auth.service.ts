import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/AuthResponse';
import { HttpClient } from '@angular/common/http';
import { catchError,tap,BehaviorSubject,throwError } from 'rxjs';
import { AuthUser } from '../models/authUser';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient,
    private router:Router,
    private loggingService:LoggingService

  ) { }

  signUpApi:string = environment.firebaseConfig.firebaseSignUpApi;
  signInApi:string = environment.firebaseConfig.firebaseSignInApi
  apiKey:string =environment.firebaseConfig.firebaseApiKey
  Authuser = new BehaviorSubject<AuthUser>(null);
  private loggedIn = new BehaviorSubject<boolean>(false)
  $loggedIn =this.loggedIn.asObservable()
  private tokenExpiretimer= null;

  signup(email, password){
    const data = {email: email, password: password, returnSecureToken: true};
    return this.http.post<AuthResponse>
        (
            `${this.signUpApi}${this.apiKey}`, 
            data
        ).pipe(catchError(this.handleError), tap((res) => {
            this.handleCreateUser(res)
        }))
}

login(email, password){
    const data = {email: email, password: password, returnSecureToken: true};
    return this.http.post<AuthResponse>(
        `${this.signInApi}${this.apiKey}`,
        data
    ).pipe(catchError((err)=>{ return this.handleError(err)}
), tap((res) => {
        this.handleCreateUser(res)
    }))
}

logout(){
    this.Authuser.next(null);
    this.router.navigate(['/landing']);
    localStorage.removeItem('Authuser');
    localStorage.removeItem('albums');
    localStorage.removeItem('users');
    localStorage.removeItem('userAlbums');
    localStorage.removeItem('selectedUser');
    localStorage.removeItem('selectedAlbum');
    localStorage.removeItem('selectedAlbumPhotos');
    localStorage.removeItem('allPhotos');
    // this.loggedIn.next(false) for autologout

    if(this.tokenExpiretimer){
        clearTimeout(this.tokenExpiretimer);
    }
    this.tokenExpiretimer = null;
}

autoLogin(){
    const Authuser = JSON.parse(localStorage.getItem('Authuser'));

    if(!Authuser){
        return;
    }

    const loggedUser = new AuthUser(Authuser.email, Authuser.id, Authuser._token, Authuser._expiresIn)

    if(loggedUser.token){
        this.Authuser.next(loggedUser);
        const timerValue = Authuser._expiresIn.getTime() - new Date().getTime();
        this.autoLogout(timerValue);
    }
}

autoLogout(expireTime: number){
    this.tokenExpiretimer = setTimeout(() => {
        this.logout();
    }, expireTime);
}

loggedInState(isloggedin):void{
  this.loggedIn.next(isloggedin)
}

private handleCreateUser(res){
    const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
    const expiresIn = new Date(expiresInTs);
    const Authuser = new AuthUser(res.email, res.localId, res.idToken, expiresIn);
    this.Authuser.next(Authuser);
    this.autoLogout(res.expiresIn * 1000);
    localStorage.setItem('Authuser', JSON.stringify(Authuser));
}

private handleError(err){
  let errorMessage = 'An unknown error has occured'
  console.log(err);
  if(!err.error || !err.error.error){
      return throwError(() => errorMessage);
  }
  switch (err.error.error.message){
      case 'EMAIL_EXISTS':
          errorMessage ="This email already exists.";
          break;
      case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'This operation is not allowed.';
          break;
      case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage = 'The email ID or Password is not correct.';
          break
  }
  const errorObj = { statusCode: err.status, errorMessage: err.message, datetime: new Date() };
    this.loggingService.logError(errorObj);

  return throwError(() => errorMessage);
}



}