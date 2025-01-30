import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login', 'signup']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with login mode enabled', () => {
    expect(component.isLoginMode).toBeTrue();
  });

  it('should toggle between login and signup mode', () => {
    component.onSwitchMode();
    expect(component.isLoginMode).toBeFalse();

    component.onSwitchMode();
    expect(component.isLoginMode).toBeTrue();
  });

  it('should call login method of AuthService when logging in', () => {
    mockAuthService.login.and.returnValue(
      of({
        token: '123',
        idToken: 'idToken123',
        email: 'user@example.com',
        refreshToken: 'refreshToken123',
        expiresIn: '3600',   
        localId: 'localId123'
      } as AuthResponse)
    );
    

    component.isLoginMode = true;
    component.onFormSubmitted({ value: { email: 'test@example.com', password: 'password' }, reset: () => {return } } as NgForm);

    expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should call signup method of AuthService when signing up', () => {
    mockAuthService.signup.and.returnValue(
      of({
        token: '123',
        idToken: 'idToken123',
        email: 'user@example.com',
        refreshToken: 'refreshToken123',
        expiresIn: '3600',  
        localId: 'localId123'
      } as AuthResponse)
    );
    
    

    component.isLoginMode = false;
    component.onFormSubmitted({ value: { email: 'test@example.com', password: 'password' }, reset: () => { return } } as NgForm);

    expect(mockAuthService.signup).toHaveBeenCalledWith('test@example.com', 'password');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show an error message if authentication fails', () => {
    mockAuthService.login.and.returnValue(throwError(() => 'Invalid credentials'));

    component.isLoginMode = true;
    component.onFormSubmitted({ value: { email: 'test@example.com', password: 'password' }, reset: () => {return;} } as NgForm);

    expect(component.errorMessage).toBe('Invalid credentials');
  });

  it('should clear the error message after 3 seconds', (done) => {
    component.errorMessage = 'Some error';
    component.hideSnackbar();

    setTimeout(() => {
      expect(component.errorMessage).toBeNull();
      done();
    }, 3100);
  });
});
