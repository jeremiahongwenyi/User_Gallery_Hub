import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';  // <-- Add this import
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

describe('AppComponent', () => {
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: HomeComponent }
        ]),
        HttpClientModule, // <-- Add HttpClientModule here
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'User_Gallery_Hub'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('User_Gallery_Hub');
  });

  it('should render header and footer components', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    const headerElement = compiled.querySelector('app-header');
    expect(headerElement).not.toBeNull();
    
    const footerElement = compiled.querySelector('app-footer');
    expect(footerElement).not.toBeNull();
  });

  it('should render router outlet correctly', () => {
    fixture.detectChanges();
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).not.toBeNull();
  });
});
