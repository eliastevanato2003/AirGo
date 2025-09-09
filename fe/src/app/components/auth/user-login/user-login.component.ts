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
  imports: [ReactiveFormsModule, NavbarComponent, MatIconModule]
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
    if(this.authService.login(formData.email!, formData.password!))
      this.router.navigate(['']);
    return true;
  }
}
