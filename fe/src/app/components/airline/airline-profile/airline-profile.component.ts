import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { AirlineService } from '../../../services/airline/airline.service';
import { HttpClient } from '@angular/common/http';
import { Airline } from '../../../models/admin/airline.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-airline-profile',
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './airline-profile.component.html',
  styleUrls: ['./airline-profile.component.css'],
  standalone: true
})
export class AirlineProfileComponent implements OnInit{
  isEditing = false;
  airlineForm: FormGroup;
  hidePassword = true;
  airlineProfile: Airline | undefined;

  constructor(private router: Router, private authService: AuthService,private fb: FormBuilder, private http: HttpClient, private airlineService: AirlineService) { 
    const token=this.authService.getToken();
    if(!token){
      this.router.navigate(['/login']);
    }
    
    this.airlineForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

   ngOnInit(): void {
    const data = this.airlineService.getData().subscribe({
      next: response => {
        console.log('Risposta dal server:', response);
        const data = response as Airline;
        if(data) {
            this.airlineProfile = {
              IdCompagniaAerea: data.IdCompagniaAerea,
              Nome: data.Nome,
              CodiceIdentificativo: data.CodiceIdentificativo,
              Email: data.Email,
              Password: data.Password
            }

            this.airlineForm.patchValue({
              name: data.Nome,
              code: data.CodiceIdentificativo,
              mail: data.Email,
              password: ''
            });
          
        }
      },
      error: error => {
        console.error('Errore caricamento profilo', error);
        alert(error.error?.message || 'Errore durante caricamento del profilo');
      }
    });
  }

  enableEditMode() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.airlineForm.patchValue({
      name: this.airlineProfile?.Nome,
      code: this.airlineProfile?.CodiceIdentificativo,
      mail: this.airlineProfile?.Email,
      password: ''
    });
  }

  saveChanges() {
    this.airlineProfile!.Nome = this.airlineForm.value.name;
    this.airlineProfile!.CodiceIdentificativo = this.airlineForm.value.code;
    this.airlineProfile!.Email = this.airlineForm.value.mail;
    this.airlineProfile!.Password = this.airlineForm.value.password;
    this.airlineService.editData(this.airlineForm.value.name, this.airlineForm.value.code, this.airlineForm.value.mail, this.airlineForm.value.password);
    this.isEditing = false;
  }

}
