import { NgModule } from '@angular/core';
import { canActivate } from './RouteGuards/AuthGuard';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AlbumComponent } from './album/album.component';
import { HomeComponent } from './home/home.component';
import { PhotoComponent } from './photo/photo.component';
import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
{path:'', redirectTo:'/landing', pathMatch:'full'},
{path:'landing', component:LandingpageComponent},
{ path: 'home', component: HomeComponent, canActivate: [canActivate] },
{ path: 'users', component: UserComponent, canActivate: [canActivate] },
{ path: 'albums', component: AlbumComponent, canActivate: [canActivate] },
{ path: 'photos', component: PhotoComponent, canActivate: [canActivate] },
{ path: 'login', component: LoginComponent },
{path:'**', component:Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'top'
    },
  ),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
