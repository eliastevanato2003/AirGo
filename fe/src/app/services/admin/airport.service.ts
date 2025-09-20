import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, tap } from 'rxjs';
import { Airport, NewAirport } from '../../models/admin/airport.model';

@Injectable({ providedIn: 'root' })
export class AirportService {
  private baseUrl = 'http://localhost:3000/api/airports';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAirports(): Observable<Airport[]> {
    const url = `${this.baseUrl}/getAirports`;
    return this.http.get<Airport[]>(url, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }

  newAirport(newairport: NewAirport): Observable<any>{
    const url= `${this.baseUrl}/newAirport`;
    return this.http.post<any>(url, newairport, {headers:this.getHeaders()}).pipe(tap());
  }

  deleteAirport(airportid: number): Observable<any[]>{
    const url = `${this.baseUrl}/deleteAirport`;
    return this.http.request<any[]>('delete', url, {
      body: {id:airportid},
      headers: this.getHeaders()
    });
  }

  updateAirport(
        id: number,
        data: {
        city?: string,
        county?: string,
        name?: string,
        identificationcode?: string
        }
    ): Observable<any> {
        const url = `${this.baseUrl}/updateAirport`;
        const body = { id, ...data };

        return this.http.post<any>(url, body, { headers: this.getHeaders() });
    }

}