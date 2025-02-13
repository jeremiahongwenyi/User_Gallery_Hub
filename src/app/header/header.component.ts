import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(
    private router:Router,
    private authService:AuthService
  
  ){}

  isLoggedIn = false;

  ngOnInit(): void {
    this.authService.$loggedIn.subscribe({
      next: () => {
        // this.isLoggedIn = isloggedin; no need to have this
        if (typeof window !== 'undefined' && window.localStorage) {
          if (localStorage.getItem('Authuser')) {
            this.isLoggedIn = true;
          } else {
            this.isLoggedIn = false;
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onPhotoClicked() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const authUser = localStorage.getItem('Authuser');
      if (authUser) {
        this.router.navigate(['/photos']);
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      return;
    }
  }
  onLoginClicked(){
    this.router.navigate(['/login'])  
  }

  onLogoutClicked(){
    this.authService.logout()
    this.isLoggedIn=false  /* u can choose to emit it from the logout function*/
  }

  onHomeClicked(){
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem('Authuser')&& localStorage.getItem('users')) {
    this.router.navigate(['/home'])
      } else {
        this.router.navigate(['/login'])
      }
  } else {
    return;
  }
}
}
