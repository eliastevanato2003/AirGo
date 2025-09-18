import { Component, OnInit } from '@angular/core';
import { Airline, NewAirline } from '../../../models/admin/airline.model';
import { AirlineService } from '../../../services/admin/airline.service';
import { NavbarComponent} from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { FlightService } from '../../../services/airline/flight.service';
import { PlaneService } from '../../../services/airline/plane.service';
import { FlightDb } from '../../../models/airline/flight.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-airlineflights',
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './airlineflights.component.html',
  styleUrl: './airlineflights.component.css'
})
export class AirlineFlightsComponent implements OnInit {
  showCreate = false;
  flights: FlightDb[] = [];
  planes: any[] = [];
  routes: any[] = [];
  newFlightForm: FormGroup;
  airlineId: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService, private airlineService: AirlineService, private fb: FormBuilder, private flightService: FlightService, private planeService: PlaneService) {
    this.newFlightForm = this.fb.group({
      plane: ['', Validators.required],
      route: ['', Validators.required],
      schdepdate: ['', Validators.required],
      scharrdate: ['', Validators.required],
      pcprize: ['', [Validators.required, Validators.min(0)]],
      bprize: ['', [Validators.required, Validators.min(0)]],
      eprize: ['', [Validators.required, Validators.min(0)]],
      ecprize: ['', [Validators.required, Validators.min(0)]],
      bagprize: ['', [Validators.required, Validators.min(0)]],
      lrprize: ['', [Validators.required, Validators.min(0)]],
      scprize: ['', [Validators.required, Validators.min(0)]],
    });
  }

   ngOnInit(): void {
    this.airlineId = this.authService.getId();

    if (this.airlineId) {
      this.loadFlights();
      this.loadPlanes();
    } else {
      this.authService.whatId()
        .pipe(filter(id => id !== null))
        .subscribe(id => {
          this.airlineId = id!;
          this.loadFlights();
          this.loadPlanes();
        });
    }
  }

  private loadFlights(): void {
    if (!this.airlineId) return;
    this.flightService.getFlightsByAirline(this.airlineId).subscribe({
      next: (flights) => this.flights = flights,
      error: (err) => console.error('Errore caricamento voli', err)
    });
    console.log(this.flights);
  } 

  private loadPlanes(): void {
    if (!this.airlineId) return;
    this.planeService.getPlanesByAirline(this.airlineId).subscribe({
      next: (planes) => this.planes = planes,
      error: (err) => console.error('Errore caricamento aerei', err)
    });
  }

  addFlight(): void {
    if (this.newFlightForm.invalid) {
      console.error('Form non valido');
      return;
    }

    const formValue = this.newFlightForm.value;

    this.flightService.addFlight({
      plane: formValue.plane,
      route: formValue.route,
      schdepdate: formValue.schdepdate,
      scharrdate: formValue.scharrdate,
      pcprice: formValue.pcprice,
      bprice: formValue.bprice,
      eprice: formValue.eprice,
      bagprice: formValue.bagprice || 0,
      lrprice: formValue.lrprice || 0,
      scprice: formValue.scprice || 0
    }).subscribe({
      next: (res) => {
        alert('Volo creato con successo');
        this.newFlightForm.reset();
        this.loadFlights();
      },
      error: (err) => {
        console.error('Errore creazione volo:', err);
      }
    });
  }

  closeModal(): void{
    this.showCreate=false;
    this.newFlightForm.reset();
  }


}
