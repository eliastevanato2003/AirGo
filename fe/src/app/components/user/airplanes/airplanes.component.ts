import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.css'],
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule]
})
export class AirplanesComponent implements OnInit {

  airplanes: any[] = [];
  airplaneModels: any[] =[];
  showModal = false;

  newPlaneForm: FormGroup;

  constructor(private http: HttpClient, private authService: AuthService, private fb: FormBuilder) {
    this.newPlaneForm = this.fb.group({
      model: ['', Validators.required],
      constructionyear: ['', [Validators.required, Validators.min(1900)]]
    });
  }

  ngOnInit(): void {
  const airlineUrl = 'http://localhost:3000/api/airlines/getAirline';
  const token = this.authService.getToken();

  console.log('Token JWT:', token);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  this.http.get<any>(airlineUrl, { headers }).subscribe({
    next: (airline) => {
      console.log('Dati compagnia aerea:', airline);
      const airlineId = airline.IdCompagniaAerea;

      const planesUrl = `http://localhost:3000/api/planes/getPlanes?airline=${airlineId}`;

      this.http.get<any[]>(planesUrl, { headers }).subscribe({
        next: (planes) => {
          this.airplanes = planes;
        },
        error: (err) => console.error('Errore caricamento aerei', err)
      });
    },
    error: (err) => console.error('Errore caricamento compagnia', err)
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
        this.newPlaneForm.reset();

        this.ngOnInit();
      },
      error: (err) => {
        console.error('Errore creazione aereo', err);
      }
    });

    const modelsUrl = 'http://localhost:3000/api/models/getModels';
    this.http.get<any[]>(modelsUrl, { headers }).subscribe({
      next: (models) => this.airplaneModels = models,
      error: (err) => console.error('Errore caricamento modelli', err)
    });
  }
}
