import { Component, OnInit } from '@angular/core';
import { Airline, NewAirline } from '../../../models/admin/airline.model';
import { AirlineService } from '../../../services/admin/airline.service';
import { NgModel, ɵInternalFormsSharedModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css'],
  imports: [CommonModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
  standalone: true
})
export class AirlinesComponent implements OnInit {
  airlines: Airline[] | null = [];
  newAirline: NewAirline = { name: '', code: '', email: '', password: 'password' };

  public airlineForm: FormGroup | any;

  constructor(private airlineService: AirlineService) {
    this.resetForm();
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
    this.newAirline.name = formData.name!;
    this.newAirline.code = formData.code!;
    this.newAirline.email = formData.email!;
    this.airlineService.addAirline(this.newAirline).subscribe(() => {
      this.loadAirlines();
      this.resetForm();
    });
    this.newAirline = { name: '', code: '', email: '', password: 'password' };
  }

  // TODO: finire delete
  deleteAirline(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questa compagnia aerea?')) {
      this.airlineService.deleteAirline(id).subscribe(() => this.loadAirlines());
    }
  }

  resetForm() {
    this.airlineForm = new FormGroup({
      name: new FormControl(''),
      code: new FormControl(''),
      email: new FormControl('')
    });
  }
}
