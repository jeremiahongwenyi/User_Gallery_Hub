import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { AlbumComponent } from './album/album.component';
import { HomeComponent } from './home/home.component';
import { PhotoComponent } from './photo/photo.component';
import { Error404Component } from './error404/error404.component';
import { LoginComponent } from './login/login.component';
import { SnackbarComponent } from './utilities/snackbar/snackbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingpageComponent,
    FooterComponent,
    UserComponent,
    AlbumComponent,
    HomeComponent,
    PhotoComponent,
    Error404Component,
    LoginComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
