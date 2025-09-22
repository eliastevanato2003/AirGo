import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent} from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { Route, NewRoute } from '../../../models/airline/route.model';
import { RouteService } from '../../../services/airline/route.service';
import { AuthService } from '../../../services/auth.service';
import { AirportService } from '../../../services/airline/airport.service';
import { Airport } from '../../../models/airline/airport.model';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-routes',
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css'],
  standalone: true
})
export class RoutesComponent implements OnInit{

  showModal = false;
  routes: Route[] = [];
  selectedRoute: Route | null = null;
  showManage = false;
  airlineid: number | null = null;
  airports: Airport[] = [];
  newRoute: NewRoute | null = null;
  newRouteForm: FormGroup;
  filterForm: FormGroup;
  editRouteForm!: FormGroup;
  showEdit=false;


  constructor(private fb: FormBuilder, private routeService: RouteService, private authService: AuthService, private airportService: AirportService) {
    this.newRouteForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required]
    });
    this.filterForm = this.fb.group({
      id: [''],
      departure: [''],
      arrival: ['']
    });
   }

  ngOnInit(): void {
    this.airlineid=this.authService.getId();
    if (this.airlineid) {
      this.loadRoutes();
      console.log(this.routes)
      this.loadAirports();
    } else {
      console.error('ID compagnia aerea non trovato');
    }
  }

  loadRoutes(filters?: any): void {
    this.routeService.getRoutes(filters).subscribe({
      next: (routes) => this.routes = routes,
      error: (err) => console.error('Errore caricamento rotte', err)
    });
  }

  private loadAirports(): void{
    if (!this.airlineid) return;
    this.airportService.getAirports().subscribe({
      next: (airports) => this.airports = airports,
      error: (err) => console.error('Errore caricamento aeroporti', err)
    });
  }

  addRoute() : void{
    if (this.newRouteForm.invalid) return;

    const form = this.newRouteForm.value;

    this.newRoute = {
      departure: form.from,
      arrival: form.to
    };

    this.routeService.addRoute(this.newRoute).subscribe({
      next: () => {
        alert('Nuova rotta creata');
        this.closeModal();
        this.filtra();
      },
      error: (err) => {
        console.error('Errore creazione rotta', err);
        alert(err.error?.message || 'Errore durante la creazione');
      }
    });
  }

  deleteRoute(id:number): void{
    if (confirm('Sei sicuro di voler eliminare questa rotta?')) {
      this.routeService.deleteRoute(id).subscribe({
        next: () =>{
          alert('Rotta rimossa');
          this.closeManage();
          this.filtra();
        },
        error: (err) => {
          console.error('Errore rimozione rotta');
          alert(err.error?.message || 'Errore durante l\'eliminazione');
        }
      });
    }
  }

  gestisci(selected: Route): void{
    this.selectedRoute=selected;
    this.showManage=true;
  }

  closeModal(): void {
    this.showModal = false;
    this.newRouteForm.reset();
  }

  closeManage():void{
    this.showManage=false;
    this.selectedRoute=null;
  }

  filtra(): void {
    const filters = this.filterForm.value;
    const cleaned = {
      id: filters.id || undefined,
      departure: filters.departure || undefined,
      arrival: filters.arrival || undefined
    };
    this.loadRoutes(cleaned);
  }

  reset(): void {
    this.filterForm.reset({
      id: '',
      departure: '',
      arrival: ''
    });
    this.loadRoutes();
  }

  saveEdit(): void {
  if (!this.selectedRoute || this.editRouteForm.invalid) return;

  const f = this.editRouteForm.value;
  if (f.from === this.selectedRoute.IdPartenza && f.to === this.selectedRoute.IdDestinazione) {
    this.closeEdit();
    return;
  }

  this.routeService.updateRoute(
    this.selectedRoute.IdRotta,
    f.from,
    f.to
  ).subscribe({
    next: () => {
      alert('Rotta aggiornata con successo');
      this.closeEdit();
      this.filtra();
      this.closeManage();
    },
    error: (err) => {
      console.error('Errore aggiornamento rotta', err);
      alert(err.error?.message || 'Errore durante l\'aggiornamento');
    }
  });
}



  openEdit(): void {
    if(!this.selectedRoute)return;    
    
    this.editRouteForm = this.fb.group({
      from: [this.selectedRoute.IdPartenza || '', Validators.required],
      to: [this.selectedRoute.IdDestinazione || '', Validators.required],
    });
    this.showEdit = true;
  }

  closeEdit(): void {
    this.showEdit = false;
    this.editRouteForm.reset();
  }
}
