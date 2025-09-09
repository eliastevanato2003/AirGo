import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { User, userProfile } from '../../../models/user/user.model';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NgIf, NavbarComponent, FooterComponent]
})
export class UserProfileComponent implements OnInit {
  userProfile: userProfile | undefined;
  
  isEditingPersonal = false;
  isEditingContact = false;

  hidePassword = true;

  personalForm: FormGroup;
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private userService: UserService) {
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
    const data = this.userService.getData();
    if(data) {
        this.userProfile = {
          name: data.Nome,
          surname: data.Cognome,
          password: '',
          email: data.Email,
          phone: data.Telefono
        }

        // Inizializza entrambi i form con i dati dell'utente al caricamento
        this.personalForm.patchValue({
          name: data.Nome,
          surname: data.Cognome,
          password: ''
        });
        this.contactForm.patchValue({
          email: data.Email,
          phone: data.Telefono
        });
    }
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
      this.userProfile!.password = this.personalForm.value.password;
      this.userService.editPersonal(this.userProfile!.name, this.userProfile!.surname, this.userProfile!.password);
      this.isEditingPersonal = false;
    } else if (section === 'contact' && this.contactForm.valid) {
      this.userProfile!.email = this.contactForm.value.email;
      this.userProfile!.phone = this.contactForm.value.phone;
      this.userService.editContact(this.userProfile!.email, this.userProfile!.phone);      
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