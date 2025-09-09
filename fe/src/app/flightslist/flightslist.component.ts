import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Flight {
  airline: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
}

@Component({
  selector: 'app-flightslist',
  templateUrl: './flightslist.component.html',
  styleUrls: ['./flightslist.component.css'],
  imports: [CommonModule, NgIf, NgFor]
})
export class FlightsListComponent implements OnInit {
  flights: Flight[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Esempio di dati simulati (normalmente arriverebbero da un servizio API)
    this.flights = [];

    const url = 'http://localhost:3000/api/flights/getFlights';

    // Filtri della get
    const message = {}

    // Richiesta dei dati
    this.http.get<{flights: any[]}>(url).subscribe({
      next: (response) => {
        response.flights.forEach((res) => {
          let flight = res as {
            IdVolo: number,
            Aereo: number,
            Rotta: number,
            DataPartenzaPrev: string,
            DateArrivoPrev: string,
            DataPartenzaEff: null,
            DataArrivoEff: null,
            Stato: string,
            CostoPC: number,
            CostoB: number,
            CostoE: number,
            CostoBag: number,
            CostoLegRoom: number,
            CostoSceltaPosto: number,
            IsActive: null,
            NomePartenza: string,
            CittaPartenza: string,
            CodicePartenza: string,
            NomeArrivo: string,
            CittaArrivo: string,
            CodiceArrivo: string
          };
          // Inserimento dei dati in this.flights
          this.flights.push({
            from: flight.CittaPartenza + ' (' + flight.CodicePartenza + ')',
            to: flight.CittaArrivo + ' (' + flight.CodiceArrivo + ')',
            departure: flight.DataPartenzaPrev,
            arrival: flight.DateArrivoPrev,
            airline: '',
            price: flight.CostoE
          } as Flight);
        });
      },
      error: (error) => {
        console.error('getFlights error:', error);
        // Gestisci l'errore, magari mostrando un messaggio all'utente
      }
    });
  }
}
