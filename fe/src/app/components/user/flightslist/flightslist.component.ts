import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Flight, FlightDb } from '../../../models/user/flight.model';
import { FlightService } from '../../../services/user/flight.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flightslist',
  templateUrl: './flightslist.component.html',
  styleUrls: ['./flightslist.component.css'],
  imports: [CommonModule]
})
export class FlightsListComponent implements OnInit {
  flights: Flight[] = [];

  constructor(private flightService: FlightService, private router: Router) { }

  ngOnInit(): void {
    this.flightService.getFlights().subscribe({
      next: response => {
        response.forEach((res) => {
          let flight = res as FlightDb;
          // Inserimento dei dati in this.flights
          this.flights.push({
            id: flight.IdVolo,
            from: flight.CittaPartenza + ' (' + flight.CodicePartenza + ')',
            to: flight.CittaArrivo + ' (' + flight.CodiceArrivo + ')',
            departure: flight.DataPartenzaPrev,
            arrival: flight.DataArrivoPrev,
            airline: '',
            price: flight.CostoE
          } as Flight);
        })
      },
      error: (error) => {
        console.error('getUser error:', error);
        // Gestisci l'errore, magari mostrando un messaggio all'utente
      }
    });
  }

  buyTicket(id: number) {
    this.router.navigate(['seatselection'], { queryParams: { id: id } });
  }
}
