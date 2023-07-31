import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = "https://localhost:7102/";

  private currentUserSource = new BehaviorSubject<User | null>(null);

  currentUser$ = this.currentUserSource.asObservable();

  userName = "";
  userRoles: string[] = [];

  constructor(
    private http: HttpClient
  ) { }

  initCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.currentUserSource.next(user);
    this.userName = user.userName;
    this.userRoles = this.getRoles();
    console.log(this.userName);
    console.log(this.userRoles);
  }

  setCurrenUser(user: User) {
    this.currentUserSource.next(user);
  }

  getToken() {
    return this.currentUserSource.getValue()?.token;
  }

  getRoles() {
    let jwt = this.currentUserSource.getValue()?.token;
    let roles: string[] = [];
    if (jwt) {
      let decodedJwtData = JSON.parse(window.atob(jwt.split('.')[1]))
      roles.push(decodedJwtData.role);
    }
    return roles;
  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + "Account/Login", model).pipe(
      map(
        (response: User) => {
          const user = response;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
            this.userName = user.userName;
            this.userRoles = this.getRoles();
          }
          return user;
        })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + "Account/Register", model).pipe(
      map(
        (response: User) => {
          const user = response;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
            this.userName = user.userName;
            this.userRoles = this.getRoles();
          }
        })
    );
  }
}


