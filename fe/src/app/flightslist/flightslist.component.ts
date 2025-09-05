import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

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

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    // Esempio di dati simulati (normalmente arriverebbero da un servizio API)
    this.flights = [
      { airline: 'Alitalia', from: 'Roma', to: 'Milano', departure: '2025-09-10 09:00', arrival: '2025-09-10 10:15', price: 120 },
      { airline: 'Ryanair', from: 'Roma', to: 'Londra', departure: '2025-09-11 14:00', arrival: '2025-09-11 16:30', price: 150 },
      { airline: 'EasyJet', from: 'Milano', to: 'Parigi', departure: '2025-09-12 07:30', arrival: '2025-09-12 09:45', price: 130 }
    ];

    const url = 'http://localhost:3000/api/flights/getFlights';

      // Filtri della get
      const message = {}

      const token = this.authService.getToken();

      // Crea l'intestazione di autorizzazione
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      // Richiesta dei dati
      this.http.post(url, message, { headers: headers }).subscribe({
        next: (response) => {
          for(const flight in response) {
            // TODO: inserimento dei dati in this.flights
          }
        },
        error: (error) => {
          console.error('getFlights error:', error);
          // Gestisci l'errore, magari mostrando un messaggio all'utente
        }
      });
  }
}
