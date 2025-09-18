import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, tap } from 'rxjs';
import { FlightDb, NewFlight } from '../../models/airline/flight.model';

@Injectable({ providedIn: 'root' })
export class FlightService {
  private baseUrl = 'http://localhost:3000/api/flights';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getFlights(): Observable<FlightDb[]> {
    const url = `${this.baseUrl}/getFlights?status=All`;
    return this.http.get<FlightDb[]>(url, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }

  getFlightsByAirline(airlineId: number): Observable<FlightDb[]> {
    const url = `${this.baseUrl}/getFlights?airline=${airlineId}&status=All`;
    return this.http.get<FlightDb[]>(url, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }

  getFlightById(flightId: number): Observable<FlightDb>{
    const url=`${this.baseUrl}/getFlights?id=${flightId}&status=All` ;
    return this.http.get<FlightDb>(url, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }


  getFlightStatus(flightId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getFlightStatus?id=${flightId}`, { headers: this.getHeaders() }).pipe(tap());
  }

 
  addFlight(data: NewFlight): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/newFlight`, data, { headers: this.getHeaders() }).pipe(tap());
  }


  markDeparture(flightId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/departure`, { id: flightId }, { headers: this.getHeaders() }).pipe(tap());
  }

  markArrival(flightId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/arrival`, { id: flightId }, { headers: this.getHeaders() }).pipe(tap());
  }


  updateEffectiveDate(flightId: number, effdepdate: string, effarrdate: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/updateEffDate`,
      { id: flightId, effdepdate, effarrdate },
      { headers: this.getHeaders() }
    ).pipe(tap());
  }

  updatePrices(flightId: number, pcprice: number, bprice: number, eprice: number): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/updatePrices`,
      { id: flightId, pcprice, bprice, eprice },
      { headers: this.getHeaders() }
    ).pipe(tap());
  }

  deleteFlight(flightId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteFlight?id=${flightId}`, { headers: this.getHeaders() }).pipe(tap());
  }
}
