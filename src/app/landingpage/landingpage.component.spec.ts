import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LandingpageComponent } from './landingpage.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LandingpageComponent', () => {
  let component: LandingpageComponent;
  let fixture: ComponentFixture<LandingpageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingpageComponent],
      imports: [RouterTestingModule] 
    }).compileComponents();
    
    fixture = TestBed.createComponent(LandingpageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /home if Authuser exists', () => {
    spyOn(router, 'navigate');
    spyOn(localStorage, 'getItem').and.returnValue('{"user":"test"}'); 

    component.exploreUsersClicked();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show an error message if Authuser does not exist', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    
    component.exploreUsersClicked();

    expect(component.errorMessage).toBe('Please Login first');
  });

  it('should hide the snackbar and navigate to /login after 2 seconds', fakeAsync(() => {
    spyOn(router, 'navigate');
    component.errorMessage = 'Please Login first';

    component.hideSnackbar();
    tick(2000); 

    expect(component.errorMessage).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));
});
