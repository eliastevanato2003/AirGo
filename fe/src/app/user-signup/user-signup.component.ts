import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {

  public signupForm;

  constructor(private router: Router, private http: HttpClient) {
    this.signupForm = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      email: new FormControl(''),
      password1: new FormControl(''),
      password2: new FormControl(''),
      phone: new FormControl(''),
      dob: new FormControl('')
    }, { validators: this.passwordMatchValidator });
  }

  login() {
    this.router.navigate(['/login']);
  }

  async signup() {
    if (!this.signupForm.valid) {
      return null;
    }

    const formData = this.signupForm.value;
    const url = 'http://localhost:3000/api/users/newUser';

    const message = `{"name": ${formData.name},
                    "surname": ${formData.surname},
                    "email": ${formData.email},
                    "password": ${formData.password1},
                    "number": ${formData.phone},
                    "dob": ${formData.dob}}`;

    // Invio dei dati al backend
    this.http.post(url, message).subscribe({
      next: (response) => {
        console.log('Risposta dal backend:', response);
        // Esempio: reindirizza l'utente a una pagina di login
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Errore durante la registrazione:', error);
        // Gestisci l'errore, magari mostrando un messaggio all'utente
      }
    });

    return true;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password1')?.value;
    const confirmPassword = control.get('password2')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
