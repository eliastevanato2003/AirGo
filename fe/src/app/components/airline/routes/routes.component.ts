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


@Component({
  selector: 'app-routes',
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css',
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


  constructor(private fb: FormBuilder, private routeService: RouteService, private authService: AuthService, private airportService: AirportService) {
    this.newRouteForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required]
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

  private loadRoutes(): void {
    if (!this.airlineid) return;
    this.routeService.getRoutes().subscribe({
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
      departureAirportId: form.from,
      destinationAirportId: form.to
    };

    this.routeService.addRoute(this.newRoute).subscribe({
      next: () => {
        alert('Nuova rotta creata');
        this.closeModal();
        this.loadRoutes();
      },
      error: (err) => console.error('Errore creazione rotta', err)
    });
  }

  deleteRoute(id:number): void{
    this.routeService.deleteRoute(id).subscribe({
      next: () =>{
        alert('Rotta rimossa');
        this.closeManage();
        this.loadRoutes();
      },
      error: (err) => console.error('Errore rimozione rotta')
    });
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
}
