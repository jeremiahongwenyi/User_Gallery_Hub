import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoggingService } from './logging.service';
import { AuthResponse } from '../models/AuthResponse';


describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const loggingServiceMock = jasmine.createSpyObj('LoggingService', ['logError']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: LoggingService, useValue: loggingServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = routerMock;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signUp', () => {
    it('should return a response and store user details', () => {
      const mockAuthResponse: AuthResponse = {
        idToken: 'fake-token',
        email: 'test@example.com',
        refreshToken: 'fake-refresh-token',
        expiresIn: '3600',
        localId: '12345',
      };

      service.signup('test@example.com', 'password').subscribe((response) => {
        expect(response).toEqual(mockAuthResponse);
      });

      const req = httpMock.expectOne(`${service.signUpApi}${service.apiKey}`);
      expect(req.request.method).toBe('POST');
      req.flush(mockAuthResponse);
    });


  describe('login', () => {
    it('should return a token on successful login', () => {
      const mockAuthResponse: AuthResponse = {
        idToken: 'fake-token',
        email: 'test@example.com',
        refreshToken: 'fake-refresh-token',
        expiresIn: '3600',
        localId: '12345',
      };

      service.login('test@example.com', 'password').subscribe((response) => {
        expect(response).toEqual(mockAuthResponse);
      });

      const req = httpMock.expectOne(`${service.signInApi}${service.apiKey}`);
      expect(req.request.method).toBe('POST');
      req.flush(mockAuthResponse);
    });

    it('should handle errors during login', () => {
      const mockError = {
        error: { error: { message: 'INVALID_LOGIN_CREDENTIALS' } },
        status: 400,
        statusText: 'Bad Request',
      };

      service.login('test@example.com', 'wrongpassword').subscribe(
        () => { return },
        (error) => {
          expect(error).toBe('The email ID or Password is not correct.');
        }
      );

      const req = httpMock.expectOne(`${service.signInApi}${service.apiKey}`);
      req.flush(mockError.error, { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('logout', () => {
    it('should logout the user and navigate to login', () => {
      localStorage.setItem('Authuser', JSON.stringify({ email: 'test@example.com' }));
      
      service.logout();
      
      expect(service.Authuser.value).toBeNull();
      expect(localStorage.getItem('Authuser')).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
});
