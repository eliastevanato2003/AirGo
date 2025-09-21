import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, RouterLink, RouterLinkActive, JsonPipe],
  standalone: true
})
export class FlightsComponent {

  public searchFlightsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchFlightsForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      departureDate: ['', Validators.required],
      arrivalDate: ['', Validators.required]
    });
  }

  getData() {
    const formData = this.searchFlightsForm.value;
    const data = {
      from: formData.from,
      to: formData.to,
      departureDate: formData.departureDate,
      arrivalDate: formData.arrivalDate
    }
    return data;
  }
}
