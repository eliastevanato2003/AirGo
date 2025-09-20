import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, tap } from 'rxjs';
import { Airport } from '../../models/airline/airport.model';

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
}
