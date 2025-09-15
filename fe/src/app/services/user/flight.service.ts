import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { FlightStatus } from "../../models/user/flight.model";

@Injectable({ providedIn: 'root' })
export class FlightService {
  constructor(private http: HttpClient) { }

  getFlights() {
    const url = 'http://localhost:3000/api/flights/getFlights';

    // Filtri della get
    const message = {};

    // Richiesta dei dati
    return this.http.get<[]>(url, message).pipe(tap());
  }

  getFlightStatus(id: number) {
    const url = 'http://localhost:3000/api/flights/getFlightStatus';

    // Filtri della get
    const options = {
        params: { id: id.toString() }
    };

    // Richiesta dei dati
    return this.http.get<FlightStatus[]>(url, options).pipe(tap());
  }
}