import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AirlineService } from '../../../services/airline/airline.service';
import { Router } from '@angular/router';
import { Airline } from '../../../models/admin/airline.model';

@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.css'],
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule]
})
export class AirplanesComponent implements OnInit {

  airplanes: any[] = [];
  models: any[] = [];       
  showModal = false;
  creatingNewModel = false;
  evenNumbers = [2, 4, 6, 8];
  airlineid: number | undefined;


  newPlaneForm: FormGroup;
  newModelForm: FormGroup;

  constructor(private http: HttpClient, private authService: AuthService, private airlineService: AirlineService, private fb: FormBuilder, private router: Router) {
    this.newPlaneForm = this.fb.group({
      model: ['', Validators.required],
      constructionyear: ['', [Validators.required, Validators.min(1900)]]
    });
    this.newModelForm = this.fb.group({
      name: ['', Validators.required],
      firstclass: ['', [Validators.required, Validators.min(0)]],
      rowb: ['', [Validators.required, Validators.min(0)]],
      colb: ['', [Validators.required, Validators.min(0)]],
      rowe: ['', [Validators.required, Validators.min(0)]],
      cole: ['', [Validators.required, Validators.min(0)]],
      extraleg: ['', [Validators.min(0)]],
    });
  }

  ngOnInit(): void {
  
  const token = this.authService.getToken();

  console.log('Token JWT:', token);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  this.airlineService.getData().subscribe({
    next: response => {
      console.log('Risposta dal server:', response);
      const data = response as Airline;

      if(data) {
        this.airlineid = data.IdCompagniaAerea;

        const planesUrl = `http://localhost:3000/api/planes/getPlanes?airline=${this.airlineid}`;

            
        this.http.get<any[]>(planesUrl, { headers }).subscribe({
              next: (planes) => {
                this.airplanes = planes;
              },
              error: (err) => console.error('Errore caricamento aerei', err)
            });

        const modelsUrl = `http://localhost:3000/api/models/getModels`;
        this.http.get<any[]>(modelsUrl, { headers }).subscribe({
          next: (models) => {
            this.models = models;
          },
          error: (err) => console.error('Errore caricamento modelli',err)
        });
      
      }else{
        this.router.navigate(['/']);
        console.log('Nessuna compagnia aerea trovata, reindirizzamento alla home');
        return;
      }
    },
    error: (error) => {
      console.error('getUser error:', error);
      // Gestisci l'errore, magari mostrando un messaggio all'utente
    }
  });
}


  addPlane(): void {
    if (this.newPlaneForm.invalid) return;

    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const url = 'http://localhost:3000/api/planes/newPlane';

    const formData = this.newPlaneForm.value;
    const message = {
      model: formData.model,
      constructionyear: formData.constructionyear,
    };

    this.http.post(url, message, { headers }).subscribe({
      next: () => {
        alert('Nuovo aereo creato');
        this.showModal = false;
        this.closeModal();//fa anche reset del form

        this.ngOnInit();
      },
      error: (err) => {
        console.error('Errore creazione aereo', err);
      }
    });
  }

  addModel() : void {
      if (this.newModelForm.invalid) return;
      const token = this.authService.getToken();
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      const url = 'http://localhost:3000/api/models/newModel';

      const formData = this.newModelForm.value;
      const message = {
        name: formData.name,
        seatspc: formData.firstclass,
        rowsb: formData.rowb,
        columnsb: formData.colb,
        rowse: formData.rowe,
        columnse: formData.cole,
        extralegrows: formData.extraleg,
      };

      this.http.post(url, message, { headers }).subscribe({
        next: () => {
          alert('Nuovo modello creato');
          this.creatingNewModel = false;
          this.closeCreate();//fa anche reset del form

          this.ngOnInit();
        },
        error: (err) => {
          console.error('Errore creazione modello', err);
        }
      });
  }

  closeModal(): void {
    this.showModal = false;
    this.newPlaneForm.reset();
    this.newPlaneForm.reset({
      model: '',
      constructionyear: null
    });
  }

  closeCreate() : void {
    this.creatingNewModel = false;
    this.newModelForm.reset();
    this.newModelForm.reset({
      name: '',
      firstclass: null,
      rowb: null,
      colb: '',
      rowe: null,
      cole: '',
      extraleg: null
    });
  }

  create() : void {
    this.creatingNewModel = true;
    this.newPlaneForm.reset();
    this.newPlaneForm.reset({
      model: '',
      constructionyear: null
    });
  }
}
