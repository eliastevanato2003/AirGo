import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getRoutes(filters?: { id?: number; departure?: number; arrival?: number }): Observable<Route[]> {
    const url = `${this.baseUrl}/getFlightRoutes`;

    let params = new HttpParams();
    if (filters) {
      if (filters.id) params = params.set('id', filters.id.toString());
      if (filters.departure) params = params.set('departure', filters.departure.toString());
      if (filters.arrival) params = params.set('arrival', filters.arrival.toString());
    }

    return this.http.get<Route[]>(url, { headers: this.getHeaders(), params }).pipe(
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
    const url = `${this.baseUrl}/deleteFlightRoute`;
    return this.http.request<any>('delete', url, { 
      body: {id:routeid},
      headers: this.getHeaders() }
    );
  }

  updateRoute(id: number, dep?: number, arr?: number): Observable<any> {
  const url = `${this.baseUrl}/updateFlightRoute`;

  const body: any = { id };
  if (dep != null) body.dep = dep;
  if (arr != null) body.arr = arr;

  return this.http.post<any>(url, body, { headers: this.getHeaders() });
}



}
