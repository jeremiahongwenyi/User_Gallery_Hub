import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { LoggingService } from '../services/logging.service';
import { throwError } from 'rxjs';


describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let loggingServiceSpy: jasmine.SpyObj<LoggingService>;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    // Create mock HttpClient and LoggingService
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    loggingServiceSpy = jasmine.createSpyObj('LoggingService', ['logError']);
    
    // Mock localStorage.setItem
    localStorageSpy = jasmine.createSpyObj('localStorage', ['setItem']);

    // Configure testing module
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: LoggingService, useValue: loggingServiceSpy },
        { provide: 'localStorage', useValue: localStorageSpy }
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



    it('should handle error when fetching photos for an album', () => {
      const errorResponse = { status: 500, message: 'Server error' };

      httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

      service.getPhotosForAlbum(1).subscribe(
        () => { return },
        (error) => {
          expect(error).toEqual(errorResponse);
          expect(loggingServiceSpy.logError).toHaveBeenCalledWith({
            statusCode: 500,
            errorMessage: 'Server error',
            datetime: jasmine.any(Date)
          });
        }
      );
    });
  });

