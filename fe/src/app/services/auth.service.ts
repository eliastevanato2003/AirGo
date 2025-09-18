import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { get } from 'http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  private role$ = new BehaviorSubject<number | null>(null);
  private id$ = new BehaviorSubject<number | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    if (this.isBrowser()) {
      const token = localStorage.getItem('authToken');
      this.loggedIn$.next(!!token);

      const role = Number(localStorage.getItem('userRole'));
      this.role$.next(role);
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

  saveRole(role: number) {
    if (this.isBrowser()) {
      localStorage.setItem('userRole', role.toString());
      this.role$.next(role);
    }
  }

  saveId(id: number) {
    if (this.isBrowser()) {
      localStorage.setItem('userId', id.toString());
      this.id$.next(id);
    }
  }

  // Ottieni il token da localStorage
  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('authToken') : null;
  }

  getRole(): number | null {
    return this.role$.value || (this.isBrowser() ? Number(localStorage.getItem('userRole')) || null : null);
  }

  getId(): number | null {
    return this.id$.value || (this.isBrowser() ? Number(localStorage.getItem('userId')) || null : null);
  }

  // Rimuovi il token da localStorage
  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('authToken');
      this.loggedIn$.next(false);
      localStorage.removeItem('userRole');
      this.role$.next(null);
      localStorage.removeItem('userId');
      this.id$.next(null);
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

  whatRole() {
    return this.role$.asObservable();
  }

  whatId(){
    return this.id$.asObservable();   
  }

  login(email: string, password: string) {
    const url = 'http://localhost:3000/api/users/login';

    const message = {
      email: email,
      password: password
    };

  
    return this.http.post<{ token: string, role: number , id: number}>(url, message).pipe(
      tap(response => {
        this.saveToken(response.token);
        this.saveRole(response.role);
        this.saveId(response.id);
        console.log("Login avvenuto con successo");
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
