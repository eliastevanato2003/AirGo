import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/admin/user.model'; // Assumi di avere un User model

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }


  getUsers(filters: { id?: number; name?: string; surname?: string; email?: string } = {}): Observable<User[]> {
    const url = `${this.baseUrl}/getUsers`;
    
    let params = new HttpParams();
    if (filters.id !== undefined && filters.id !== null) params = params.set('id', filters.id.toString());
    if (filters.name) params = params.set('name', filters.name);
    if (filters.surname) params = params.set('surname', filters.surname);
    if (filters.email) params = params.set('email', filters.email);

    return this.http.get<User[]>(url, { headers: this.getHeaders(), params }).pipe(
      tap()
    );
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.baseUrl}/deleteUser`;
    
    return this.http.request<any>('delete', url, {
      body: { id: userId },
      headers: this.getHeaders()
    }).pipe(
      tap()
    );
  }
}
