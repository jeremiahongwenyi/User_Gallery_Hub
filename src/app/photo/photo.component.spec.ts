import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoComponent } from './photo.component';
import { UserService } from '../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoComponent],
      imports: [HttpClientTestingModule], // Provides HttpClient to avoid NullInjectorError
      providers: [UserService], // Provide the UserService
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
