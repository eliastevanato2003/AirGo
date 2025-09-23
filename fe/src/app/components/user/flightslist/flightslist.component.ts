import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlightDb, FlightGroup } from '../../../models/user/flight.model';
import { FlightService } from '../../../services/user/flight.service';
import { RouterLinkActive, RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AirportService } from '../../../services/user/airport.service';
import { AuthService } from '../../../services/auth.service';
import { NavbarComponent } from "../../../navbar/navbar.component";
import { FooterComponent } from '../../../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flightslist',
  templateUrl: './flightslist.component.html',
  styleUrls: ['./flightslist.component.css'],
  imports: [CommonModule, RouterLink, RouterLinkActive, NavbarComponent, FooterComponent, FormsModule],
  standalone: true
})
export class FlightsListComponent implements OnInit {
  flightGroups: FlightGroup[] = [];
  sortBy: string = 'priceAsc';

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
              if (!response[0]) {
                to = 0;
              } else {
                to = response[0].IdAeroporto;
              }
              this.flightService.getFlights(from, to, data.departureDate, data.arrivalDate).subscribe({
                next: (res) => {
                  let response = res as FlightDb[];

                  response.forEach((res) => {
                    if ('IdVolo' in res) {
                      console.log('Single flight response:', res);
                      // Volo singolo
                      let flight = res as FlightDb;
                      this.flightGroups.push({
                        isMultiSegment: false,
                        segments: [{
                          id: flight.IdVolo,
                          from: `${flight.CittaPartenza} (${flight.CodicePartenza})`,
                          to: `${flight.CittaArrivo} (${flight.CodiceArrivo})`,
                          departure: flight.DataPartenzaPrev,
                          arrival: flight.DataArrivoPrev,
                          airline: flight.NomeCompagnia,
                          price: flight.CostoE,
                          full: flight.Pieno
                        }]
                      });
                    } else {
                      // Volo con scalo
                      const segments = Object.values(res).map((segment) => {
                        const flightSegment = segment as FlightDb;
                        return {
                          id: flightSegment.IdVolo,
                          from: `${flightSegment.CittaPartenza} (${flightSegment.CodicePartenza})`,
                          to: `${flightSegment.CittaArrivo} (${flightSegment.CodiceArrivo})`,
                          departure: flightSegment.DataPartenzaPrev,
                          arrival: flightSegment.DataArrivoPrev,
                          airline: flightSegment.NomeCompagnia,
                          price: flightSegment.CostoE,
                          full: flightSegment.Pieno
                        };
                      });

                      this.flightGroups.push({
                        isMultiSegment: true,
                        segments
                      });
                    }
                  });
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

  sortFlights() {
    this.flightGroups.sort((a, b) => {
      const aPrice = (a.segments[0]?.price || 0) + (a.segments[1]?.price || 0);
      const bPrice = (b.segments[0]?.price || 0) + (b.segments[1]?.price || 0);

      const aDate = new Date(a.segments[0]?.departure).getTime();
      const bDate = new Date(b.segments[0]?.departure).getTime();

      if (this.sortBy === 'priceDesc') {
        return bPrice - aPrice;
      } else if (this.sortBy === 'departureDesc') {
        return bDate - aDate;
      } else if (this.sortBy === 'departureAsc') {
        return aDate - bDate;
      } else { // Default to priceAsc
        return aPrice - bPrice;
      }
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
