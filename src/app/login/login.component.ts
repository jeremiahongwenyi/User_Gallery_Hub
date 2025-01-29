import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private authService:AuthService,
  private router:Router
  ){}

  isLoginMode =true;
  isLoading = false;
  errorMessage: string | null = null;
  authObs: Observable<AuthResponse>;

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode  
  }

  onFormSubmitted(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode){
      this.isLoading = true;
      this.authObs = this.authService.login(email, password);
    }else{
      this.isLoading = true;
      this.authObs = this.authService.signup(email, password);
    }

    this.authObs.subscribe({
      next: (res) => { 
        console.log(res);
        this.isLoading = false; 
        this.router.navigate(['/home']);
      },
      error: (errMsg) => { 
        this.isLoading = false;
        this.errorMessage = errMsg;
        this.hideSnackbar();
      }
    })
    form.reset();
  }

  hideSnackbar(){
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

}
