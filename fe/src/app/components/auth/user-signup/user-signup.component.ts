import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-signup',
  imports: [ReactiveFormsModule, NavbarComponent, MatIconModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {

  public signupForm;
  public hidePassword1 = true;
  public hidePassword2 = true;

  constructor(private router: Router, private authService: AuthService) {
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
  goBack(){
    this.router.navigate(['/']);
  }

  async signup() {
    if (!this.signupForm.valid) {
      return null;
    }

    const formData = this.signupForm.value;
    if(this.authService.signup(formData.name!, formData.surname!, formData.email!, formData.password1!, formData.phone!, formData.dob!)) {
      this.login();
    }
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
