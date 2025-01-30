import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from './logging.service';
import { of } from 'rxjs'; 

describe('LoggingService', () => {
  let service: LoggingService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>; 

  beforeEach(() => {
  
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

  
    TestBed.configureTestingModule({
      providers: [
        LoggingService,
        { provide: HttpClient, useValue: httpClientSpy } 
      ]
    });
    service = TestBed.inject(LoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log error using HttpClient.post', () => {
    const errorData = {
      statusCode: 500,
      errorMessage: 'Internal Server Error',
      datetime: new Date()
    };

    
    httpClientSpy.post.and.returnValue(of(null));

   
    service.logError(errorData);

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${service.ApiUrl}log.json`, 
      errorData
    );
  });
});
