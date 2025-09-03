import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Salva il token in localStorage
  login(token: string) {
    if(this.isBrowser()) localStorage.setItem('authToken', token);
  }

  // Ottieni il token da localStorage
  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('authToken') : null;
  }

  // Rimuovi il token da localStorage
  logout() {
    if(this.isBrowser()) localStorage.removeItem('authToken');
  }

  // Esempio con sessionStorage
  saveTemporaryData(data: string) {
    if(this.isBrowser()) sessionStorage.setItem('tempData', data);
  }

  getTemporaryData(): string | null {
    return this.isBrowser() ? sessionStorage.getItem('tempData'): null;
  }
}
