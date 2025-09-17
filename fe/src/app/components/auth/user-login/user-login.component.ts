import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NavbarComponent } from '../../../navbar/navbar.component';
import { AuthService } from '../../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
  imports: [ReactiveFormsModule, NavbarComponent, MatIconModule],
  standalone: true
})
export class UserLoginComponent {

  public loginForm;
  public hidePassword = true;

  public submitted = false;

  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  signup() {
    this.router.navigate(['/signup']);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  login() {
    this.submitted = true;
    const formData = this.loginForm.value;
    this.authService.login(formData.email!, formData.password!).subscribe({
      next: () => {
        console.log('Login avvenuto con successo');
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Errore login:', err);
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}
