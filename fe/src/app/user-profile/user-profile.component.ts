import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NgIf]
})
export class UserProfileComponent implements OnInit {
  userProfile: {
    name: string;
    surname: string;
    password: string;
    email: string;
    phone: string;
  } | undefined;

  isEditingPersonal = false;
  isEditingContact = false;

  personalForm: FormGroup;
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService) {
    this.personalForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const url = 'http://localhost:3000/api/users/getUser';
    
    const token = this.authService.getToken();

    // Crea l'intestazione di autorizzazione
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Richiesta dei dati
    this.http.get(url, { headers: headers }).subscribe({
      next: (response) => {
        const data = response as {
          Admin: null,
          Cognome: string,
          Dob: null,
          Email: string,
          IdEmail: null,
          IdUtente: null,
          IsActive: null,
          Mail: null,
          Nome: string,
          Password: string,
          Telefono: string
        };

        this.userProfile = {
          name: data.Nome,
          surname: data.Cognome,
          password: '*********',
          email: data.Email,
          phone: data.Telefono
        }

        // Inizializza entrambi i form con i dati dell'utente al caricamento
        this.personalForm.patchValue({
          name: data.Nome,
          surname: data.Cognome,
          password: '*********'
        });
        this.contactForm.patchValue({
          email: data.Email,
          phone: data.Telefono
        });
      },
      error: (error) => {
        console.error('GetUser error:', error);
        // Gestisci l'errore, magari mostrando un messaggio all'utente
      }
    });
  }

  enableEditMode(section: 'personal' | 'contact'): void {
    if (section === 'personal') {
      this.isEditingPersonal = true;
    } else if (section === 'contact') {
      this.isEditingContact = true;
    }
  }

  saveChanges(section: 'personal' | 'contact'): void {
    if (section === 'personal' && this.personalForm.valid) {
      this.userProfile!.name = this.personalForm.value.name;
      this.userProfile!.surname = this.personalForm.value.surname;
      // TODO: Inviare i dati al backend
      this.isEditingPersonal = false;
    } else if (section === 'contact' && this.contactForm.valid) {
      this.userProfile!.email = this.contactForm.value.email;
      this.userProfile!.phone = this.contactForm.value.phone;
      // TODO: Inviare i dati al backend
      this.isEditingContact = false;
    }
  }

  cancelEdit(section: 'personal' | 'contact'): void {
    if (section === 'personal') {
      this.personalForm.patchValue({ name: this.userProfile?.name, surname: this.userProfile?.surname, password: this.userProfile?.password });
      this.isEditingPersonal = false;
    } else if (section === 'contact') {
      this.contactForm.patchValue({ email: this.userProfile?.email, phone: this.userProfile?.phone });
      this.isEditingContact = false;
    }
  }
}