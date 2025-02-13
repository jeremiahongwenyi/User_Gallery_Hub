import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { Album } from '../models/album';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userServiceMock=null;
  let routerMock=null;
  let userIdSubject: BehaviorSubject<number>;

  beforeEach(async () => {
    localStorage.clear();
    userIdSubject = new BehaviorSubject<number>(null);
    userServiceMock = {
      $clickedUserId: userIdSubject.asObservable(),
      getUserWithId: jasmine.createSpy('getUserWithId').and.returnValue(of({ 
        id: 1, 
        name: 'Test User', 
        username: 'testuser', 
        email: 'test@example.com' 
      })),
      getAlbumsForUser: jasmine.createSpy('getAlbumsForUser').and.returnValue(of([
        { userId: 1, id: 1, title: 'Test Album' }
      ])),
      emitAlbum: jasmine.createSpy('emitAlbum')
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to $clickedUserId and update selectedUserId', () => {
    userIdSubject.next(2);
    expect(component.selectedUserId).toBe(2);
  });

  it('should fetch user from service when localStorage has no selectedUser', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Simulate empty localStorage
  
    component.selectedUserId = 1;
    component.getUser();
  
    expect(userServiceMock.getUserWithId).toHaveBeenCalledWith(1);
    expect(component.selectedUser).toEqual(jasmine.objectContaining({
      id: 1,
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com'
    }));
  });
  

  it('should fetch user from localStorage when available', () => {
    const mockUserArray = JSON.stringify([{ id: 1, name: 'Stored User', username: 'storeduser', email: 'stored@example.com' }]);
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === 'selectedUser' ? mockUserArray : null;
    });

    component.selectedUserId = 1;

    component.getUser();

    expect(component.responseArrived).toBeTrue();
  expect(component.selectedUser).toEqual(JSON.parse(mockUserArray));
  });

  it('should fetch albums from service when localStorage has no userAlbums', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null); // Simulate empty localStorage

    component.selectedUserId = 1;
    component.getAlbums();

    expect(userServiceMock.getAlbumsForUser).toHaveBeenCalledWith(1);
    expect(component.userAlbums).toEqual([{ userId: 1, id: 1, title: 'Test Album' }]);
    expect(component.isLoading).toBeFalse();
    expect(component.responseArrived).toBeTrue();
  });

  it('should load albums from localStorage if available and matching selectedUserId', () => {
    const mockAlbums = JSON.stringify([{ userId: 1, id: 1, title: 'Stored Album' }]);
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === 'userAlbums' ? mockAlbums : null;
    });
    
    component.selectedUserId = 1;
    
    component.getAlbums();
    
    expect(component.userAlbums).toEqual(JSON.parse(mockAlbums));
    expect(component.isLoading).toBeFalse();
    expect(userServiceMock.getAlbumsForUser).not.toHaveBeenCalled();
  });
  
  

  it('should call emitAlbum and navigate on album click', () => {
    const album: Album = { userId: 1, id: 1, title: 'Test Album' };
    
    component.onAlbumClicked(album);

    expect(userServiceMock.emitAlbum).toHaveBeenCalledWith(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/albums']);
  });
});
