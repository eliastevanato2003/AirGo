import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Flight, FlightDb } from '../../../models/user/flight.model';
import { FlightService } from '../../../services/user/flight.service';
import { RouterLinkActive, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flightslist',
  templateUrl: './flightslist.component.html',
  styleUrls: ['./flightslist.component.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive],
  standalone: true
})
export class FlightsListComponent implements OnInit {
  flights: Flight[] = [];

  constructor(private flightService: FlightService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let from: number = 0;
    let to: number = 0;
    this.route.queryParams.subscribe(params => {
      const data = JSON.parse(params['data'] || '[]');
      this.flightService.getAirportIdByName(data.from).subscribe({
        next: (response) => {
          from = response[0].IdAeroporto;
          this.flightService.getAirportIdByName(data.to).subscribe({
            next: (response) => {
              to = response[0].IdAeroporto;
              this.flightService.getFlights(from, to, data.departureDate, data.arrivalDate).subscribe({
                next: (res) => {
                  let response = res as FlightDb[];
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
                      price: flight.CostoE,
                    } as Flight);
                  })
                },
                error: (error) => {
                  console.error('getFlights error:', error);
                  // Gestisci l'errore, magari mostrando un messaggio all'utente
                }
              });
            },
            error: (error) => {
              console.log('getAirportTo error: ', error);
            }
          });
        },
        error: (error) => {
          console.log('getAirportFrom error: ', error);
        }
      });
    });
  }
}
