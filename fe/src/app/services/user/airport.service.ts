import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Airport } from '../../models/user/airport.model';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private url = 'http://localhost:3000/api/airports/getAirports';

  constructor(private http: HttpClient) {}

  getAirportIdByName(name: string) {
    const url = 'http://localhost:3000/api/airports/getAirports';
    const message = {
      city: name
    };

    return this.http.get<Airport[]>(url, { params: message }).pipe(tap());
  }

  searchAirports(query: string): Observable<any[]> {
    if (!query.trim()) {
      return of([]);
    }
    console.log("Searching airports with query:", query);
    return this.http.get<any[]>(this.url, { params: { city: query + '%' } });
  }
}
