import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
  imports: [ReactiveFormsModule]
})
export class UserLoginComponent {

  public loginForm;

  constructor(private router: Router, private http: HttpClient) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  async login() {

    const formData = this.loginForm.value;
    const url = 'http://localhost:3000/api/users/login';

    const message = `{"email": ${formData.email},
                    "password": ${formData.password}}`;

    console.log(formData.email);

    // Invio dei dati al backend
    this.http.post(url, message).subscribe({
      next: (response) => {
        console.log('Risposta dal backend:', response);
        // Esempio: reindirizza l'utente a una pagina home
        this.router.navigate(['/flights']);
      },
      error: (error) => {
        console.error('Errore durante la registrazione:', error);
        // Gestisci l'errore, magari mostrando un messaggio all'utente
      }
    });

    return true;
  }
}
