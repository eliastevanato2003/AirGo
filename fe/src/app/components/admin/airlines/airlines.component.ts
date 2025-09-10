import { Component, OnInit } from '@angular/core';
import { Airline, NewAirline } from '../../../models/admin/airline.model';
import { AirlineService } from '../../../services/admin/airline.service';
import { NgModel, ɵInternalFormsSharedModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css'],
  imports: [CommonModule, ɵInternalFormsSharedModule, ReactiveFormsModule]
})
export class AirlinesComponent implements OnInit {
  airlines: Airline[] | null = [];
  newAirline: NewAirline = { name: '', code: '', email: '', password: 'password' };

  public airlineForm;

  constructor(private airlineService: AirlineService) {
    this.airlineForm = new FormGroup({
      name: new FormControl(''),
      code: new FormControl(''),
      email: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loadAirlines();
  }

  async loadAirlines() {
    this.airlines = await this.airlineService.getAirlines();
    console.log(this.airlines);
  }

  addAirline() {
    const formData = this.airlineForm.value;
    this.newAirline.name = formData.name!;
    this.newAirline.code = formData.code!;
    this.newAirline.email = formData.email!;
    this.airlineService.addAirline(this.newAirline);
    this.newAirline = { name: '', code: '', email: '', password: 'password' };
  }

  deleteAirline(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questa compagnia aerea?')) {
      //this.airlineService.deleteAirline(id).subscribe(() => this.loadAirlines());
    }
  }
}
