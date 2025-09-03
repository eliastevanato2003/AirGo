import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
  imports: [NavbarComponent, FooterComponent]
})
export class FlightsComponent {
  from: string = 'London Stansted';
  to: string = 'Stockholm';
  departureDate: string = '10/06/2023';
  returnDate: string = '18/08/2023';

  constructor(private router: Router) {}

  searchFlights() {
    console.log('Searching flights...');
    console.log(`From: ${this.from}`);
    console.log(`To: ${this.to}`);
    console.log(`Departure: ${this.departureDate}`);
    console.log(`Return: ${this.returnDate}`);
    alert(`Searching flights from ${this.from} to ${this.to}`);
  }

  
}
