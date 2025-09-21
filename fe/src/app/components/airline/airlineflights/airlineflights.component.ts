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
  filterForm: FormGroup;
  expandedSection: string | null = null;
  showEditPrices=false;
  showEditDates=false;
  editPricesForm!: FormGroup;
  editDatesForm!: FormGroup;

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
    this.filterForm = this.fb.group({
      id: [''],
      departure: [''],
      arrival: [''],
      mindatedeparture: [''],
      maxdatedeparture: [''],
      mindatearrival: [''],
      maxdatearrival: [''],
      status: ['All']
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

  private loadFlights(filters:any={}): void {
    if (!this.airlineId) return;
    filters.airline = this.airlineId;
    this.flightService.getFlights(filters).subscribe({
      next: (flights) => this.flights = flights,
      error: (err) => console.error('Errore caricamento voli', err)
    });
    console.log(this.flights);
  } 

  private loadPlanes(): void {
    if (!this.airlineId) return;
    this.planeService.getPlanes({airline:this.airlineId}).subscribe({
      next: (planes) => this.planes = planes,
      error: (err) => console.error('Errore caricamento aerei', err)
    });
  }

  private loadRoutes(): void {
    if (!this.airlineId) return;
    this.routeService.getRoutes().subscribe({
      next: (routes) => this.routes = routes,
      error: (err) => console.error('Errore caricamento rotte', err)
    });
    console.log(this.routes);
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
        this.filtra();
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
    this.expandedSection=null;
  }

  decolloVolo(idvolo: number): void {
    this.flightService.markDeparture(idvolo).subscribe({
      next: (res) => {
        alert('Volo segnato come decollato');
        this.filtra();
        this.closeManage();
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
        this.filtra();
        this.closeManage();
      },
      error: (err) => {
        console.error('Errore durante l\'atterraggio del volo:', err);
      }
    });
  }


  filtra(): void {
    const filters = { ...this.filterForm.value };

    Object.keys(filters).forEach(key => {
      if (!filters[key]) delete filters[key];
    });

    this.loadFlights(filters);
  }

  reset(): void {
    this.filterForm.reset({ status: 'All' });
    this.filtra();
  }

  toggleSection(section: string): void {
    this.expandedSection = this.expandedSection === section ? null : section;
  }

  cancellaVolo(id:number):void{
    if (confirm('Sei sicuro di voler eliminare questo volo?')) {
      this.flightService.deleteFlight(id).subscribe({
        next: (res) => {
          alert('Volo eliminato con successo');
          this.filtra();
          this.closeManage();
        },
        error: (err) => {
          console.error('Errore eliminazione volo', err);
          alert(err.error?.message || 'Errore durante l\'eliminazione');
        }
      });
    }
  }

  checkin(id:number):void{


    this.flightService.assignSeats(id).subscribe({
      next: (res) => {
        alert('Check-in effettuato con successo');
        this.filtra();
        this.closeManage();
      },
      error: (err) => {
        console.error('Errore nel check-in del volo', err);
        alert(err.error?.message || 'Errore durante il check-in');
      }
    });
  }

  // === PER I PREZZI ===
  openEditPrices(): void {
    if (!this.selectedFlight) return;

    this.editPricesForm = this.fb.group({
      pcprice: [this.selectedFlight.CostoPC, [Validators.required, Validators.min(0)]],
      bprice: [this.selectedFlight.CostoB, [Validators.required, Validators.min(0)]],
      eprice: [this.selectedFlight.CostoE, [Validators.required, Validators.min(0)]],
    });

    this.showEditPrices = true;
  }

  closeEditPrices(): void {
    this.showEditPrices = false;
    this.editPricesForm.reset();
  }

  saveEditPrices(): void {
    if (!this.selectedFlight || this.editPricesForm.invalid) return;

    const f = this.editPricesForm.value;

    // controlla se ci sono modifiche
    if (f.pcprice === this.selectedFlight.CostoPC &&
        f.bprice === this.selectedFlight.CostoB &&
        f.eprice === this.selectedFlight.CostoE) {
      this.closeEditPrices();
      return;
    }

    this.flightService.updatePrices(
      this.selectedFlight.IdVolo,
      f.pcprice,
      f.bprice,
      f.eprice
    ).subscribe({
      next: () => {
        alert("Prezzi aggiornati con successo");
        this.closeEditPrices();
        this.filtra(); // ricarica la lista filtrata
        this.closeManage();
      },
      error: (err) => {
        console.error("Errore aggiornamento prezzi", err);
        alert(err.error?.message || "Errore durante l'aggiornamento dei prezzi");
      }
    });
  }


  // === PER LE DATE EFFETTIVE ===
  openEditDates(): void {
    if (!this.selectedFlight) return;

    this.editDatesForm = this.fb.group({
      effdepdate: [this.formatDateForInput(this.selectedFlight.DataPartenzaEff), Validators.required],
      effarrdate: [this.formatDateForInput(this.selectedFlight.DataArrivoEff), Validators.required],
    });

    this.showEditDates = true;
  }

  closeEditDates(): void {
    this.showEditDates = false;
    this.editDatesForm.reset();
  }

  saveEditDates(): void {
    if (!this.selectedFlight || this.editDatesForm.invalid) return;

    const f = this.editDatesForm.value;

    if (f.effdepdate === this.selectedFlight.DataPartenzaEff &&
        f.effarrdate === this.selectedFlight.DataArrivoEff) {
      this.closeEditDates();
      return;
    }

    this.flightService.updateEffectiveDate(
      this.selectedFlight.IdVolo,
      f.effdepdate,
      f.effarrdate
    ).subscribe({
      next: () => {
        alert("Orari aggiornati con successo");
        this.closeEditDates();
        this.filtra();
        this.closeManage();
      },
      error: (err) => {
        console.error("Errore aggiornamento orari", err);
        alert(err.error?.message || "Errore durante l'aggiornamento orari");
      }
    });
  }


  private formatDateForInput(date: any): string | null {
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString().slice(0,16);
  }

}
