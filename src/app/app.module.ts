import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
