import { Component, OnInit } from '@angular/core';
import { Airline, NewAirline } from '../../../models/admin/airline.model';
import { AirlineService } from '../../../services/admin/airline.service';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent} from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';

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

  public airlineForm: FormGroup | any;

  constructor(private airlineService: AirlineService, private fb: FormBuilder) {
    this.airlineForm = this.fb.group({
      name:  ['', Validators.required],
      email: ['', Validators.required],
      code: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAirlines();
  }

  loadAirlines() {
    this.airlineService.getAirlines().subscribe({
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
      password: formData.password
    };

    this.airlineService.addAirline(this.newAirline).subscribe(() => {
      this.airlineForm.reset();
      this.loadAirlines();
      this.closeModal();
    });
  }

  // TODO: finire delete
  deleteAirline(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questa compagnia aerea?')) {
      this.airlineService.deleteAirline(id).subscribe(() => this.loadAirlines());
    }
  }

  

  closeModal(): void {
    this.showModal = false;
    this.airlineForm.reset();
  }
}
