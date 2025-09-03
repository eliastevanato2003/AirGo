import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.isBrowser()) {
      const token = localStorage.getItem('authToken');
      this.loggedIn$.next(!!token);
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Salva il token in localStorage
  login(token: string) {
    if(this.isBrowser()) {
      localStorage.setItem('authToken', token);
      this.loggedIn$.next(true);
    }
  }

  // Ottieni il token da localStorage
  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('authToken') : null;
  }

  // Rimuovi il token da localStorage
  logout() {
    if(this.isBrowser()) {
      localStorage.removeItem('authToken');
      this.loggedIn$.next(false);
    }
  }

  // Esempio con sessionStorage
  saveTemporaryData(data: string) {
    if(this.isBrowser()) sessionStorage.setItem('tempData', data);
  }

  getTemporaryData(): string | null {
    return this.isBrowser() ? sessionStorage.getItem('tempData'): null;
  }

  isLoggedIn() {
    return this.loggedIn$.asObservable();
  }
}
