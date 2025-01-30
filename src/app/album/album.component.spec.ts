import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumComponent } from './album.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let userServiceMock = null
  let routerMock = null;;
  let albumIdSubject: Subject<number>;

  beforeEach(async () => {
    albumIdSubject = new Subject<number>();

    userServiceMock = {
      $clickedAlbumId: albumIdSubject.asObservable(),
      getAlbumWithId: jasmine.createSpy('getAlbumWithId').and.returnValue(
        of({ userId: 1, id: 1, title: 'Test Album' })
      ),
      getPhotosForAlbum: jasmine.createSpy('getPhotosForAlbum').and.returnValue(
        of([
          { albumId: 1, id: 1, title: 'Test Photo', url: 'test.jpg', thumbnailUrl: 'test_thumb.jpg' }
        ])
      )
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [AlbumComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedAlbumId when $clickedAlbumId emits a value', () => {
    albumIdSubject.next(1);
    expect(component.selectedAlbumId).toBe(1);
  });

  it('should fetch album from service when localStorage has no selectedAlbum', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.selectedAlbumId = 1;
    component.getAlbum();

    expect(userServiceMock.getAlbumWithId).toHaveBeenCalledWith(1);
    expect(component.selectedAlbum).toEqual(
      jasmine.objectContaining([{
        userId: 1,
        id: 1,
        title: 'Test Album'
      }])
    );
  });

  it('should load album from localStorage if available', () => {
    const storedAlbum = JSON.stringify([{ id: 1, title: 'Stored Album', userId: 1 }]);
    spyOn(localStorage, 'getItem').and.returnValue(storedAlbum);
  
    component.getAlbum();
  
    expect(component.selectedAlbum).toEqual(
      jasmine.objectContaining([{
        id: 1,
        title: 'Stored Album',
        userId: 1
      }])
    );
  });
  

  it('should fetch photos from service when localStorage has no selectedAlbumPhotos', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    component.selectedAlbumId = 1;
    component.getPhotos();

    expect(userServiceMock.getPhotosForAlbum).toHaveBeenCalledWith(1);
    expect(component.albumPhotos).toEqual([
      {
        albumId: 1,
        id: 1,
        title: 'Test Photo',
        url: 'test.jpg',
        thumbnailUrl: 'test_thumb.jpg'
      }
    ]);
  });

  it('should load photos from localStorage if available', () => {
    const storedPhotos = JSON.stringify([
      { albumId: 1, id: 1, title: 'Stored Photo', url: 'stored.jpg', thumbnailUrl: 'stored_thumb.jpg' }
    ]);
    spyOn(localStorage, 'getItem').and.returnValue(storedPhotos);

    component.getPhotos();

    expect(component.albumPhotos).toEqual([
      {
        albumId: 1,
        id: 1,
        title: 'Stored Photo',
        url: 'stored.jpg',
        thumbnailUrl: 'stored_thumb.jpg'
      }
    ]);
  });

  it('should set isLoading correctly while fetching album', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.selectedAlbumId = 1;
    
    component.getAlbum();
    
    expect(component.isLoading).toBe(false); 
  });

  it('should set isLoading correctly while fetching photos', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.selectedAlbumId = 1;
    
    component.getPhotos();
    
    expect(component.isLoading).toBe(false); 
  });
});
