import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from "@angular/forms";
import { NavbarComponent } from '../../../navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AirlineService } from '../../../services/airline/airline.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  imports: [ReactiveFormsModule, NavbarComponent, MatIconModule, CommonModule],
  standalone: true
})
export class PasswordComponent {

  public passwordForm: FormGroup;
  public hidePassword1 = true;
  public hidePassword2 = true;

  public submitted = false;

  private email: string = '';
  private temp: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private airlineService: AirlineService) {
    this.passwordForm = new FormGroup({
      password1: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required])
    }, { validators: this.passwordsMatch });

    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.temp = params['temp'];
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  submit() {
    this.submitted = true;

    if (this.passwordForm.invalid) {
      return;
    }

    const formData = this.passwordForm.value;
    this.airlineService.activateAirline(this.email, this.temp, formData.password1, formData.password2);
    console.log('Form submitted:', formData);
  }

  get f() {
    return this.passwordForm.controls;
  }

  // Validator custom per controllare che le due password coincidano
  passwordsMatch(group: AbstractControl) {
    const pass1 = group.get('password1')?.value;
    const pass2 = group.get('password2')?.value;
    return pass1 === pass2 ? null : { notMatching: true };
  }
}
