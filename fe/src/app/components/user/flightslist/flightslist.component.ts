import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Flight, FlightDb } from '../../../models/user/flight.model';
import { FlightService } from '../../../services/user/flight.service';
import { RouterLinkActive, RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AirportService } from '../../../services/user/airport.service';
import { AuthService } from '../../../services/auth.service';

// TODO: scalo (?)

@Component({
  selector: 'app-flightslist',
  templateUrl: './flightslist.component.html',
  styleUrls: ['./flightslist.component.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive],
  standalone: true
})
export class FlightsListComponent implements OnInit {
  flights: Flight[] = [];

  constructor(private authService: AuthService, private flightService: FlightService, private airportService: AirportService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let from = 0;
    let to = 0;
    this.route.queryParams.subscribe(params => {
      const data = JSON.parse(params['data'] || '[]');
      this.airportService.getAirportIdByName(data.from.split(' ')[0]).subscribe({
        next: (response) => {
          if (!response[0]) {
            from = 0;
          } else {
            from = response[0].IdAeroporto;
          }
          this.airportService.getAirportIdByName(data.to.split(' ')[0]).subscribe({
            next: (response) => {
              if(!response[0]) {
                to = 0;
              } else {
                to = response[0].IdAeroporto;
              }
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

  buy() {
    const token = this.authService.getToken();
    if (!token) {
      alert('Devi essere loggato per acquistare un volo.');
      this.router.navigate(['/login']);
    }
  }
}
