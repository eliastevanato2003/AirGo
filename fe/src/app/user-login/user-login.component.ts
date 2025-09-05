import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
  imports: [ReactiveFormsModule, NavbarComponent, FontAwesomeModule]
})
export class UserLoginComponent {

  public loginForm;
  public hidePassword = true;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  goBack(){
    this.router.navigate(['/']);
  }

  async login() {

    const formData = this.loginForm.value;
    const url = 'http://localhost:3000/api/users/login';

    const message = {
      email: formData.email,
      password: formData.password
    };

    // Invio dei dati al backend
    this.http.post(url, message).subscribe({
      next: (response) => {
        const authResponse = response as {token: string};
        // La risposta dal server è un oggetto con la proprietà 'token'
        const token = authResponse.token; 

        // Salva il token in un luogo sicuro, come il localStorage
        this.authService.login(token);
        console.log('Logged in');
        // Esempio: reindirizza l'utente a una pagina home
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Login error:', error);
        // Gestisci l'errore, magari mostrando un messaggio all'utente
      }
    });

    return true;
  }
}
