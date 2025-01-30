import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Album } from '../models/album';
import { User } from '../models/user';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['fetchUsers', 'fetchAlbums', 'emitUser']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('subscribeUserAndAlbums', () => {
    it('should call subscribeUserAndAlbums on init', () => {
      spyOn(component, 'subscribeUserAndAlbums');
      component.ngOnInit();
      expect(component.subscribeUserAndAlbums).toHaveBeenCalled();
    });
    
    it('should load data from localStorage if available', () => {
      const mockUsers: User[] = [{ id: 1, name: 'John', username: 'john_doe', email: 'john@example.com', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, phone: '', website: '', company: { name: '', catchPhrase: '', bs: '' } }];
      const mockAlbums: Album[] = [{ id: 1, userId: 1, title: 'Album 1' }];

      spyOn(localStorage, 'getItem').and.callFake((key) => {
        if (key === 'users') return JSON.stringify(mockUsers);
        if (key === 'albums') return JSON.stringify(mockAlbums);
        return null;
      });

      component.subscribeUserAndAlbums();

      expect(component.allUsers.length).toBe(1);
      expect(component.allUsers[0].albumCount).toBe(1);
      expect(component.responseArrived).toBeTrue();
      expect(component.isLoading).toBeFalse();
    });

    it('should fetch data from API if localStorage is empty', () => {
      const mockUsers: User[] = [{ id: 1, name: 'John', username: 'john_doe', email: 'john@example.com', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, phone: '', website: '', company: { name: '', catchPhrase: '', bs: '' } }];
      const mockAlbums: Album[] = [{ id: 1, userId: 1, title: 'Album 1' }];

      spyOn(localStorage, 'getItem').and.returnValue(null);
      userServiceSpy.fetchUsers.and.returnValue(of(mockUsers));
      userServiceSpy.fetchAlbums.and.returnValue(of(mockAlbums));

      component.subscribeUserAndAlbums();

      expect(userServiceSpy.fetchUsers).toHaveBeenCalled();
      expect(userServiceSpy.fetchAlbums).toHaveBeenCalled();
      expect(component.allUsers.length).toBe(1);
      expect(component.allUsers[0].albumCount).toBe(1);
      expect(component.responseArrived).toBeTrue();
      expect(component.isLoading).toBeFalse();
    });
  });

  describe('onRowClicked', () => {
    it('should emit user ID and navigate', () => {
      const user: User = { id: 1, name: 'John', username: 'john_doe', email: 'john@example.com', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, phone: '', website: '', company: { name: '', catchPhrase: '', bs: '' } };

      component.onRowClicked(user);

      expect(userServiceSpy.emitUser).toHaveBeenCalledWith(1);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
    });
  });
});
