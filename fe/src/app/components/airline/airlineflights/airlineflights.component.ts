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
import { RouteService } from '../../../services/airline/route.service';
import { FlightDb, NewFlight } from '../../../models/airline/flight.model';
import { Route } from '../../../models/airline/route.model';
import { Plane } from '../../../models/airline/plane.model';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-airlineflights',
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './airlineflights.component.html',
  styleUrl: './airlineflights.component.css',
  standalone: true
})
export class AirlineFlightsComponent implements OnInit {
  showCreate = false;
  flights: FlightDb[] = [];
  planes: Plane[] = [];
  routes: Route[] = [];
  newFlightForm: FormGroup;
  airlineId: number | null = null;
  newflight: NewFlight | null = null;
  selectedFlight: FlightDb | null = null;
  showManage = false;
  selectedFlightStatus: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService, private airlineService: AirlineService, private fb: FormBuilder, private flightService: FlightService, private planeService: PlaneService, private routeService: RouteService) {
    this.newFlightForm = this.fb.group({
      plane: ['', Validators.required],
      route: ['', Validators.required],
      schdepdate: ['', Validators.required],
      scharrdate: ['', Validators.required],
      pcprice: ['', [Validators.required, Validators.min(0)]],
      bprice: ['', [Validators.required, Validators.min(0)]],
      eprice: ['', [Validators.required, Validators.min(0)]],
      bagprice: ['', [Validators.required, Validators.min(0)]],
      lrprice: ['', [Validators.required, Validators.min(0)]],
      scprice: ['', [Validators.required, Validators.min(0)]],
    });
  }

   ngOnInit(): void {
    this.airlineId = this.authService.getId();

    if (this.airlineId) {
      this.loadFlights();
      this.loadPlanes();
      this.loadRoutes();
    } else {
      console.error('ID compagnia aerea non trovato');
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

  private loadRoutes(): void {
    if (!this.airlineId) return;
    this.routeService.getRoutesByAirline(this.airlineId).subscribe({
      next: (routes) => this.routes = routes,
      error: (err) => console.error('Errore caricamento rotte', err)
    });
    console.log(this.routes);
  }

  private loadFlightById(flightId: number): void {
    this.flightService.getFlightById(flightId).subscribe({
      next: (flight) => {
        this.selectedFlight = flight;
        this.selectedFlightStatus = flight.Stato;
      },
      error: (err) => console.error('Errore caricamento volo', err)
    });
  }

  addFlight(): void {
    if (this.newFlightForm.invalid) {
      console.error('Form non valido');
      return;
    }

    const formValue = this.newFlightForm.value;

    this.newflight = {
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
    };

    this.flightService.addFlight(this.newflight).subscribe({
      next: (res) => {
        alert('Volo creato con successo');
        this.newFlightForm.reset();
        this.loadFlights();
        this.showCreate = false;
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

  gestisci(flight: FlightDb): void {
    this.selectedFlight = flight;
    this.showManage = true;
    this.selectedFlightStatus = flight.Stato;
  }

  closeManage(): void {
    this.showManage = false;
    this.selectedFlight = null;
    this.selectedFlightStatus = null;
  }

  decolloVolo(idvolo: number): void {
    this.flightService.markDeparture(idvolo).subscribe({
      next: (res) => {
        alert('Volo segnato come decollato');
        this.loadFlights();
        this.loadFlightById(idvolo);
      },
      error: (err) => {
        console.error('Errore durante la partenza del volo:', err);
      }
    });
  }

  atterraggioVolo(idvolo: number): void {
    this.flightService.markArrival(idvolo).subscribe({
      next: (res) => {
        alert('Volo segnato come atterrato');
        this.loadFlights();
        this.loadFlightById(idvolo);
      },
      error: (err) => {
        console.error('Errore durante l\'atterraggio del volo:', err);
      }
    });
  }




}
