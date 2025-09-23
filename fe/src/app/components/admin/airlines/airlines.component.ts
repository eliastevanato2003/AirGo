import { Component, OnInit } from '@angular/core';
import { Airline, NewAirline } from '../../../models/admin/airline.model';
import { AirlineService } from '../../../services/admin/airline.service';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent} from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
  standalone: true
})
export class AirlinesComponent implements OnInit {
  airlines: Airline[] | null = [];
  newAirline: NewAirline | null= null;
  showModal = false;
  filterForm: FormGroup;
  airlineForm: FormGroup | any;

  constructor(private router: Router, private authService: AuthService, private airlineService: AirlineService, private fb: FormBuilder) {
    const token=this.authService.getToken();
    if(!token){
      this.router.navigate(['/login']);
    }
    this.airlineForm = this.fb.group({
      name:  ['', Validators.required],
      email: ['', Validators.required],
      code: ['', Validators.required],
    });
    
    this.filterForm = this.fb.group({
      name:  [''],
      email: [''],
      code: [''],
      id: ['', Validators.min(0)]
    });
  }

  ngOnInit(): void {
    this.loadAirlines();
  }

  private loadAirlines(filters:any={}) {
    this.airlineService.getAirlines(filters).subscribe({
      next: (response) => {
        this.airlines = response as Airline[];
      }
    });
  }

  addAirline() {
    const formData = this.airlineForm.value;
    
    this.newAirline={
      name: formData.name,
      code: formData.code,
      email: formData.email,
    };

    this.airlineService.addAirline(this.newAirline).subscribe({
      next:() => {
        alert('Nuova compagnia aerea creata');
        this.airlineForm.reset();
        this.loadAirlines();
        this.closeModal();
    },
        error: (err) => {
          console.error('Errore creazione compagnia aerea', err);
          alert(err.error?.message || 'Errore durante la creazione');
        }
  });
  }


  deleteAirline(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questa compagnia aerea?')) {
      this.airlineService.deleteAirline(id).subscribe({
        next: (res) => {
          alert('Compagnia aerea eliminata con successo');
          this.loadAirlines();
        },
        error: (err) => {
          console.error('Errore eliminazione compagnia aerea', err);
          alert(err.error?.message || 'Errore durante l\'eliminazione');
        }
      });
    }
  }

  

  closeModal(): void {
    this.showModal = false;
    this.airlineForm.reset();
  }

  filtra(): void {
    const filters = { ...this.filterForm.value };

    Object.keys(filters).forEach(key => {
      if (filters[key] === '' || filters[key] === null) {
        delete filters[key];
      }
    });

    this.loadAirlines(filters);
  }

  reset(): void {
    this.filterForm.reset();
    this.loadAirlines();
  }

}
