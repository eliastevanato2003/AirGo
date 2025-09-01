import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

export interface UserProfile {
  name: string;
  password: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NgIf]
})
export class UserProfileComponent implements OnInit {
  userProfile: {
    name: string;
    password: string;
    email: string;
    phone: number;
  } | undefined;

  isEditingPersonal = false;
  isEditingContact = false;

  personalForm: FormGroup;
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.personalForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const url = 'http://localhost:3000/api/users/getUser';

    if (!isPlatformBrowser(this.platformId))
      this.router.navigate(['login']);
    
    const token = localStorage.getItem('jwt_token');

    // Crea l'intestazione di autorizzazione
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Richiesta dei dati
    this.http.get(url, { headers: headers }).subscribe({
      next: (response) => {
        console.log(response);
        const data = response as {
          admin: null,
          surname: string,
          dob: null,
          email: string,
          idemail: null,
          idutente: null,
          isactive: null,
          mail: null,
          name: string,
          password: string,
          phone: string
        };
        // Inizializza entrambi i form con i dati dell'utente al caricamento
        this.personalForm.patchValue({
          name: data.name + ' ' + data.surname,
          password: '*********'
        });
        this.contactForm.patchValue({
          email: data.email,
          phone: data.phone
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
      this.personalForm.patchValue({ name: this.userProfile?.name, password: this.userProfile?.password });
      this.isEditingPersonal = false;
    } else if (section === 'contact') {
      this.contactForm.patchValue({ email: this.userProfile?.email, phone: this.userProfile?.phone });
      this.isEditingContact = false;
    }
  }
}