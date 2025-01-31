import { inject } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export const canActivate = (
): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> => {
  const route = inject(Router);

  // Check if the Authuser object is in localStorage
 if (typeof window !== 'undefined' && window.localStorage){
    const authUser = localStorage.getItem('Authuser');
    if (authUser) {
        return true;
      } else {
        return route.createUrlTree(['/login']);
      }
 } else {
    return;
 }
  
  
}
