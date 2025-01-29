import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(
    private http:HttpClient
  ) { }

  ApiUrl:string =environment.firebaseConfig.firebaseDatabaseURL;

  logError(data: {statusCode: number, errorMessage: string, datetime: Date}){
    console.log(data + 'arrived');
    console.log(data.statusCode);
    this.http.post(`${this.ApiUrl}log.json`, data)
    .subscribe();
    
       
}
}
