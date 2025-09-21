import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getFlights(filters: {
    id?: number;
    airline?: number;
    departure?: number;
    arrival?: number;
    datedeparture?: string;     // YYYY-MM-DD
    datearrival?: string;       // YYYY-MM-DD
    mindatedeparture?: string;  // YYYY-MM-DD
    maxdatedeparture?: string;  // YYYY-MM-DD
    mindatearrival?: string;    // YYYY-MM-DD
    maxdatearrival?: string;    // YYYY-MM-DD
    order?: number;
    plane?: number;
    status?: string;            // Programmato, Decollato, Atterrato, Cancellato, All
  } = {}): Observable<FlightDb[]> {
    const url = `${this.baseUrl}/getFlights`;

    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value != null) {
        params = params.set(key, value.toString());
      }
    });

    if (!filters.status) {
      params = params.set('status', 'All');
    }

    return this.http.get<FlightDb[]>(url, { headers: this.getHeaders(), params }).pipe(
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
    return this.http.request<any>('delete', `${this.baseUrl}/deleteFlight`, { 
      body: {id:flightId},
      headers: this.getHeaders() 
    });
  }

  assignSeats(flightid: number): Observable<any> {
    const url = `${this.baseUrl}/assignSeats`;
    const body = { id: flightid };

    return this.http.post<any>(url, body, {
      headers: this.getHeaders()
    });
  }

}
