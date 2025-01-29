import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AlbumComponent } from './album/album.component';
import { HomeComponent } from './home/home.component';
import { PhotoComponent } from './photo/photo.component';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
{path:'', redirectTo:'/landing', pathMatch:'full'},
{path:'landing', component:LandingpageComponent},
{path:'home', component:HomeComponent},
{path:'users', component:UserComponent},
{path:'albums', component: AlbumComponent},
{path:'photos', component: PhotoComponent},
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
