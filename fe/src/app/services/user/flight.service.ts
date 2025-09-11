import { HttpClient } from "@angular/common/http";
import { Flight, FlightDb } from "../../models/user/flight.model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class FlightService {

  private flights: Flight[] = [];

  constructor(private http: HttpClient) { }

  getFlights() {
    const url = 'http://localhost:3000/api/flights/getFlights';

    // Filtri della get
    const message = {};

    // Richiesta dei dati
    this.http.get<{ flights: any[] }>(url).subscribe({
      next: (response) => {
        response.flights.forEach((res) => {
          let flight = res as FlightDb;
          // Inserimento dei dati in this.flights
          this.flights.push({
            id: flight.IdVolo,
            from: flight.CittaPartenza + ' (' + flight.CodicePartenza + ')',
            to: flight.CittaArrivo + ' (' + flight.CodiceArrivo + ')',
            departure: flight.DataPartenzaPrev,
            arrival: flight.DateArrivoPrev,
            airline: '',
            price: flight.CostoE
          } as Flight);
        });
        return this.flights;
      },
      error: (error) => {
        console.error('getFlights error:', error);
        // Gestisci l'errore, magari mostrando un messaggio all'utente
      }
    });
    return null;
  }
}