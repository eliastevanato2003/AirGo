import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaneService } from '../../../services/airline/plane.service';
import { ModelService } from '../../../services/airline/model.service';
import { NewPlane, Plane } from '../../../models/airline/plane.model';
import { Model } from '../../../models/airline/model.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';



@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.css'],
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule, NgSelectModule],
  standalone: true
})
export class AirplanesComponent implements OnInit {

  airplanes: Plane[] = [];
  models: Model[] = [];
  showModal = false;
  airlineId: number | null = null;
  newAirplane: NewPlane | null = null;
  newPlaneForm: FormGroup;
  filterForm: FormGroup;


  constructor(
    private authService: AuthService,
    private planeService: PlaneService,
    private modelService: ModelService,
    private fb: FormBuilder,
    private router: Router
  ) {
    const token=this.authService.getToken();
    if(!token){
      this.router.navigate(['/login']);
    }
    this.newPlaneForm = this.fb.group({
      model: ['', Validators.required],
      constructionyear: ['', [Validators.required, Validators.min(1900)]]
    });
    this.filterForm = this.fb.group({
    id: ['', Validators.min(0)],
    model: [''],
    constructionYear: [''],
    inservice: [true]
  });    
  }

  ngOnInit(): void {
    this.airlineId = this.authService.getId();

    if (this.airlineId) {
      this.loadPlanes();
      this.loadModels();
    } else {
      console.error('ID compagnia aerea non trovato');
    }
  }

  private loadPlanes(filters: any = {}): void {
    if (!this.airlineId) return;

    filters.airline = this.airlineId;

    this.planeService.getPlanes(filters).subscribe({
      next: (planes) => {
        this.airplanes = planes;
      },
      error: (err) => {
        console.error('Errore caricamento aerei', err);
        alert(err.error?.message || 'Errore durante il caricamento aerei');
      }
    });
  }

  private loadModels(): void {
    this.modelService.getModels().subscribe({
      next: (models) => this.models = models,
      error: (err) => {
        console.error('Errore caricamento modelli', err);
        alert(err.error?.message || 'Errore durante il caricamento modelli');
      }
    });
  }

  addPlane(): void {
    if (this.newPlaneForm.invalid) return;

    const form = this.newPlaneForm.value;

    this.newAirplane = {
      model: form.model,
      constructionyear: form.constructionyear,
    };

    this.planeService.addPlane(this.newAirplane).subscribe({
      next: () => {
        alert('Nuovo aereo creato');
        this.closeModal();
        this.filtra();
      },
      error: (err) => {
        console.error('Errore creazione aereo', err);
        alert(err.error?.message || 'Errore durante la creazione');
      }
    });
  }


  deletePlane(id:number): void{
    this.planeService.deletePlane(id).subscribe({
      next: () => {
        alert('Aereo rimosso');
        this.filtra();
      },
      error: (err) => {
        console.error('Errore rimozione aereo', err);
        alert(err.error?.message || 'Errore durante la rimozione');
      }
    })
  }
  

  closeModal(): void {
    this.showModal = false;
    this.newPlaneForm.reset();
    this.newPlaneForm.reset({ model: '', constructionyear: null });
  }

  

  toCreate(): void {
    this.router.navigate(['/models']); 
  }

  ritira(id:number):void{
    this.planeService.changeService(id, false).subscribe({
      next: () => {
        alert('Aereo non più in servizio');
        this.filtra();
      },
      error: (err) => {
        console.error('Errore ritiro aereo', err);
        alert(err.error?.message || 'Errore durante il ritiro');
      }
    })
  }

  attiva(id:number):void{
    this.planeService.changeService(id, true).subscribe({
      next: () => {
        alert('Aereo ora in servizio');
        this.filtra();
      },
      error: (err) => {
        console.error('Errore attivazione aereo', err);
        alert(err.error?.message || 'Errore durante la attivazione');
      }
    })
  }

  filtra(): void {
    const filters = { ...this.filterForm.value };

    Object.keys(filters).forEach(key => {
      if (filters[key] === '' || filters[key] === null) {
        delete filters[key];
      }
    });

    this.loadPlanes(filters);
  }

  reset(): void {
    this.filterForm.reset({
      id: '',
      model: '',
      constructionYear: '',
      inservice: true
    });
    this.loadPlanes();
  }


}
