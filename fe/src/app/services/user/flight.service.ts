import { HttpClient } from "@angular/common/http";
import { Flight, FlightDb } from "../../models/user/flight.model";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FlightService {

  private flights: Flight[] = [];

  constructor(private http: HttpClient) { }

  getFlights() {
    const url = 'http://localhost:3000/api/flights/getFlights';

    // Filtri della get
    const message = {};

    // Richiesta dei dati
    return this.http.get<{flights: any[]}>(url, message).pipe(tap());
  }
}