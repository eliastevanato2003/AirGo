import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { User, userProfile } from '../../../models/user/user.model';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [ReactiveFormsModule, NavbarComponent, FooterComponent],
  standalone: true
})
export class UserProfileComponent implements OnInit {
  userProfile: userProfile | undefined;

  isEditingPersonal = false;
  isEditingContact = false;

  hidePassword = true;

  public submittedPf = false;
  public submittedCf = false;

  personalForm: FormGroup;
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService, private router: Router) {
    const token = this.authService.getToken();
    if(!token) {
      this.router.navigate(['/login']);
    }
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

  ngOnInit() {
    this.userService.getData().subscribe({
      next: response => {
        const data = response as User;

        if (data) {
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
      },
      error: (error) => {
        console.error('getUser error:', error);
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
    if (section === 'personal') {
      this.submittedPf = true;
      this.userProfile!.name = this.personalForm.value.name;
      this.userProfile!.surname = this.personalForm.value.surname;
      this.userProfile!.password = this.personalForm.value.password;
      this.userService.editPersonal(this.userProfile!.name, this.userProfile!.surname, this.userProfile!.password)
        .subscribe({
          next: () => {
            // eventuale feedback di successo
            this.isEditingPersonal = false;
            this.submittedPf = false;
          },
          error: err => {
            console.error('Errore modifica dati personali', err);
            // eventualmente mostra messaggio errore
          }
        });
    } else if (section === 'contact') {
      this.submittedCf = true;
      this.userProfile!.email = this.contactForm.value.email;
      this.userProfile!.phone = this.contactForm.value.phone;
      this.userService.editContact(this.userProfile!.email, this.userProfile!.phone).subscribe({
        next: () => {
          // eventuale feedback di successo
          this.isEditingContact = false;
          this.submittedCf = false;
        },
        error: err => {
          console.error('Errore modifica dati di contatto', err);
          // eventualmente mostra messaggio errore
        }
      });
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

  get cf() {
    return this.contactForm.controls;
  }

  get pf() {
    return this.personalForm.controls;
  }
}