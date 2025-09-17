import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NavbarComponent } from '../../../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.css',
  imports: [ReactiveFormsModule, NavbarComponent, MatIconModule],
  standalone: true
})
export class PasswordComponent {

  public passwordForm;
  public hidePassword1 = true;
  public hidePassword2 = true;

  public submitted = false;

  constructor(private router: Router) {
    this.passwordForm = new FormGroup({
      password1: new FormControl(''),
      password2: new FormControl('')
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  submit() {
    this.submitted = true;
    const formData = this.passwordForm.value;
    // TODO: chiamata server
  }

  get f() {
    return this.passwordForm.controls;
  }
}
