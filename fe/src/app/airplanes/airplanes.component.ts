import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-airplanes',
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './airplanes.component.html',
  styleUrl: './airplanes.component.css'
})
export class AirplanesComponent {
  airplanes = [
    { id: 'A001', model: 'Boeing 737', constructionYear: 2010 },
    { id: 'A002', model: 'Airbus A320', constructionYear: 2015 }
  ];

  showModal = false;
}
