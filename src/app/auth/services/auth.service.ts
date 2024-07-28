
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'authToken';

  constructor(private router: Router) {}

  login(username: string, password: string) {
    
    localStorage.setItem(this.authTokenKey, 'fake-jwt-token');
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.removeItem(this.authTokenKey);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }
}
