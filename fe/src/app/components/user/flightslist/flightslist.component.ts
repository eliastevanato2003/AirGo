import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Flight } from '../../../models/user/flight.model';
import { FlightService } from '../../../services/user/flight.service';

@Component({
  selector: 'app-flightslist',
  templateUrl: './flightslist.component.html',
  styleUrls: ['./flightslist.component.css'],
  imports: [CommonModule]
})
export class FlightsListComponent implements OnInit {
  flights: Flight[] | null = [];

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.flights = this.flightService.getFlights();
  }
}
