import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { JsonPipe, CommonModule, NgIf } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AirportService } from '../../../services/user/airport.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, RouterLink, RouterLinkActive, JsonPipe, CommonModule, NgIf],
  standalone: true
})
export class FlightsComponent implements OnInit {

  public searchFlightsForm: FormGroup;
  public fromAirports$!: Observable<any[]>;
  public toAirports$!: Observable<any[]>;

  constructor(private fb: FormBuilder, private airportService: AirportService) {
    this.searchFlightsForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      departureDate: ['', Validators.required],
      arrivalDate: ['', Validators.required]
    });
  }

  // TODO: test
  ngOnInit(): void {
    this.fromAirports$ = this.searchFlightsForm.get('from')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.airportService.searchAirports(value))
    );

    this.fromAirports$.subscribe(airports => {
      console.log('From Airports:', airports);
    });

    this.toAirports$ = this.searchFlightsForm.get('to')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => this.airportService.searchAirports(value))
    );

    this.toAirports$.subscribe(airports => {
      console.log('To Airports:', airports);
    });
  }

  selectAirport(controlName: string, airportCitta: string) {
    this.searchFlightsForm.get(controlName)?.setValue(airportCitta, { emitEvent: false });
  }

  getData() {
    return this.searchFlightsForm.value;
  }
}
