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
      next: (isloggedin) => {
        this.isLoggedIn = isloggedin;
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
    this.isLoggedIn=false
  }
}
