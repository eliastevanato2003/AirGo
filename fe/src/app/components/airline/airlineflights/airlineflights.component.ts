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
import { CommonModule } from '@angular/common';
import { Airport } from '../../../models/airline/airport.model';
import { AirportService } from '../../../services/airline/airport.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-airlineflights',
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule, NgSelectModule],
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
  airports: Airport[]=[];

  constructor(private router: Router, private http: HttpClient, private authService: AuthService, private airlineService: AirlineService, private fb: FormBuilder, private flightService: FlightService, private planeService: PlaneService, private routeService: RouteService, private airportService: AirportService) {
    const token=this.authService.getToken();
    if(!token){
      this.router.navigate(['/login']);
    }
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
      datedeparture: [''],
      datearrival: [''],
      status: ['All']
    });

  }

   ngOnInit(): void {
    this.airlineId = this.authService.getId();

    if (this.airlineId) {
      this.loadFlights();
      this.loadPlanes();
      this.loadRoutes();
      this.loadAirports();
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
      next: (routes) => {
        this.routes = routes;
     
            this.routes = this.routes.map(r => ({
              ...r,
              label: `${r.CodicePartenza} ➔ ${r.CodiceDestinazione}`
            }));
          },

      error: (err) => console.error('Errore caricamento rotte', err)
    });
  }

  private loadAirports(): void{
    if (!this.airlineId) return;
    this.airportService.getAirports().subscribe({
      next: (response) => this.airports = response,
      error: (err) => console.error('Errore caricamento aeroporti', err)
    });
  }

  addFlight(): void {
    if (this.newFlightForm.invalid) {
      console.error('Form non valido');
      return;
    }

    const formValue = this.newFlightForm.value;

    const fixDate = (dateString: string): string => {
      if (!dateString) return dateString;

      const localDate = new Date(dateString);
      const fixed = localDate.toISOString();

      return fixed; 
    };


    this.newflight = {
      plane: formValue.plane,
      route: formValue.route,
      schdepdate: fixDate(formValue.schdepdate),
      scharrdate: fixDate(formValue.scharrdate),
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
      this.flightService.cancelFlight(id).subscribe({
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



  openEditDates(): void {
  if (!this.selectedFlight || !this.selectedFlight.DataPartenzaEff || !this.selectedFlight.DataArrivoEff) return;

  const addHours = (dateStr: string, hours: number) => {
    if (!dateStr) return dateStr;
    const d = new Date(dateStr);
    d.setHours(d.getHours() + hours);
    return d.toISOString().slice(0, 16); // formato compatibile con input datetime-local
  };

  this.editDatesForm = this.fb.group({
    effdepdate: [addHours(this.selectedFlight.DataPartenzaEff, 2), Validators.required],
    effarrdate: [addHours(this.selectedFlight.DataArrivoEff, 2), Validators.required],
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

  const toUTCISOString = (dateStr: string) => {
    if (!dateStr) return dateStr;
    const d = new Date(dateStr);
    return new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds()
    ).toISOString(); // ISO con Z finale
  };

  const effdep = toUTCISOString(f.effdepdate);
  const effarr = toUTCISOString(f.effarrdate);

  if (effdep === this.selectedFlight.DataPartenzaEff &&
      effarr === this.selectedFlight.DataArrivoEff) {
    this.closeEditDates();
    return;
  }

  this.flightService.updateEffectiveDate(
    this.selectedFlight.IdVolo,
    effdep,
    effarr
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
