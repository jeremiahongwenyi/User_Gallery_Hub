import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

  constructor(private router:Router){}

  errorMessage:string|null=null;

  exploreUsersClicked(){
    const authUser = localStorage.getItem('Authuser')
    if(authUser){
      this.router.navigate(['/home'])
    } else {
      console.log('am here');
      
      console.log(authUser);
      
      this.errorMessage='Please Login first'
      this.hideSnackbar()
    }
  }

  hideSnackbar(){
    setTimeout(() => {
      this.router.navigate(['/login'])
      this.errorMessage = null;
    }, 2000);
  }
}
