import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) {}
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login() {
    this.loggedIn.next(true);
    this.router.navigate(['auth/']);
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }
}
