import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  logError(data: {statusCode: number, errorMessage: string, datetime: Date}){
    // this.http.post('https://angularhttpclient-f1d30-default-rtdb.firebaseio.com/log.json', data)
    // .subscribe();
    console.log(data + 'arrived');
    console.log(data.statusCode);
    
    
}
}
