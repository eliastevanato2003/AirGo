import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    if (this.isBrowser()) {
      const token = localStorage.getItem('authToken');
      this.loggedIn$.next(!!token);
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Salva il token in localStorage
  saveToken(token: string) {
    if (this.isBrowser()) {
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
    if (this.isBrowser()) {
      localStorage.removeItem('authToken');
      this.loggedIn$.next(false);
    }
  }

  // Esempio con sessionStorage
  saveTemporaryData(data: string) {
    if (this.isBrowser()) sessionStorage.setItem('tempData', data);
  }

  getTemporaryData(): string | null {
    return this.isBrowser() ? sessionStorage.getItem('tempData') : null;
  }

  isLoggedIn() {
    return this.loggedIn$.asObservable();
  }

  login(email: string, password: string) {
    const url = 'http://localhost:3000/api/users/login';

    const message = {
      email: email,
      password: password
    };

    // Invio dei dati al backend
    return this.http.post<{ token: string }>(url, message).pipe(
      tap(response => {
        this.saveToken(response.token);
        console.log('Logged in, token salvato:', response.token);
      })
    );
  }

  signup(name: string, surname: string, email: string, password: string, number: string, dob: string) {
    const url = 'http://localhost:3000/api/users/newUser';

    const message = {
      name: name,
      surname: surname,
      email: email,
      password: password,
      number: number,
      dob: dob
    };

    // Invio dei dati al backend
    return this.http.post(url, message).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }
}
