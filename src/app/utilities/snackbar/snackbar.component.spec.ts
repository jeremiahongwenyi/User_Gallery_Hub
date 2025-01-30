import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackbarComponent } from './snackbar.component';
import { By } from '@angular/platform-browser';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackbarComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the error message when provided', () => {
    component.errorMessage = 'This is an error!';
    fixture.detectChanges();
    
    const errorElement = fixture.debugElement.query(By.css('.sb-error'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent.trim()).toBe('This is an error!');
  });

  it('should not display anything when errorMessage is null', () => {
    component.errorMessage = null;
    fixture.detectChanges();
    
    const errorElement = fixture.debugElement.query(By.css('.sb-error'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent.trim()).toBe('');
  });

});
