import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumComponent } from './album.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Album } from '../models/album';
import { Photo } from '../models/photo';

// Mock the UserService
class MockUserService {
  $clickedAlbumId = of(1); // Simulate an album ID being emitted
  getAlbumWithId(id: number) {
    return of({ id: 1, title: 'Test Album' } as Album); // Mock response
  }
  getPhotosForAlbum(id: number) {
    return of([
      { title: 'Photo 1', thumbnailUrl: 'thumb1.jpg', url: 'url1' },
      { title: 'Photo 2', thumbnailUrl: 'thumb2.jpg', url: 'url2' },
    ] as Photo[]); // Mock response
  }
}

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let mockUserService: MockUserService;

  beforeEach(async () => {
    mockUserService = new MockUserService();
    
    await TestBed.configureTestingModule({
      declarations: [AlbumComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: {} }, // Mock Router if needed
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the album when a new album ID is emitted', () => {
    component.ngOnInit();
    
    // Simulate an album being fetched from localStorage or via service
    spyOn(localStorage, 'getItem').and.returnValue(null); // Mock localStorage return value
    
    // Run the `getAlbum` method
    component.getAlbum();
    
    // Ensure the album is fetched from the service and set in the component
    expect(component.selectedAlbum).toEqual({ id: 1, title: 'Test Album', userId:1 });
    expect(component.isLoading).toBeFalse(); // Loading should be false after fetching data
  });

  it('should load photos when a new album ID is emitted', () => {
    component.ngOnInit();
    
    // Mock localStorage return value for photos
    spyOn(localStorage, 'getItem').and.returnValue(null); 
    
    // Run the `getPhotos` method
    component.getPhotos();
    
    // Ensure the photos are fetched and set in the component
    expect(component.albumPhotos.length).toBe(2);
    expect(component.isLoading).toBeFalse(); // Loading should be false after fetching data
    expect(component.responseArrived).toBeTrue(); // Ensure responseArrived is set to true
  });

  it('should set the loading state when fetching album data', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(mockUserService, 'getAlbumWithId').and.callThrough();
    
    // Ensure isLoading is set to true before fetching data
    component.getAlbum();
    expect(component.isLoading).toBeTrue();
  });

  it('should handle errors when album data fetch fails', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(mockUserService, 'getAlbumWithId').and.returnValue(throwError({ status: 500, message: 'Server Error' }));
    
    // Simulate album data fetch failure
    component.getAlbum();
    
    // Ensure that the loading state is false and error is logged
    expect(component.isLoading).toBeFalse();
    // You can also spy on the loggingService to ensure the error is logged
  });

  it('should handle errors when photos data fetch fails', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(mockUserService, 'getPhotosForAlbum').and.returnValue(throwError({ status: 500, message: 'Server Error' }));
    
    // Simulate photos data fetch failure
    component.getPhotos();
    
    // Ensure that the loading state is false and error is logged
    expect(component.isLoading).toBeFalse();
    expect(component.responseArrived).toBeTrue(); // Even with error, the responseArrived flag should be true
  });
});
