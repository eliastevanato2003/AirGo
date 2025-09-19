import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, tap } from 'rxjs';
import { Route, NewRoute } from '../../models/airline/route.model';

@Injectable({ providedIn: 'root' })
export class RouteService {
  private baseUrl = 'http://localhost:3000/api/flightRoutes';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getRoutes(): Observable<Route[]> {
    const url = `${this.baseUrl}/getFlightRoutes`;
    return this.http.get<Route[]>(url, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }

  addRoute(data: NewRoute): Observable<any> {
    const url = `${this.baseUrl}/newFlightRoute`;
    return this.http.post<any>(url, data, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }

  deleteRoute(routeid: number): Observable<any> {
    const url = `${this.baseUrl}/deleteFlightRoute/${routeid}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }

}
