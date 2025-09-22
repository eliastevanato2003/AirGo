import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Seat } from '../../../models/user/seat.model';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { TicketBarComponent } from '../ticket-bar/ticket-bar.component';
import { JsonPipe, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-hand-baggage',
  templateUrl: './baggage-selection.component.html',
  styleUrls: ['./baggage-selection.component.css'],
  imports: [NavbarComponent, FooterComponent, TicketBarComponent, NgClass, NgFor, ReactiveFormsModule, RouterLink, RouterLinkActive, JsonPipe],
  standalone: true
})
export class BaggageSelectionComponent {
  public ticketCount: number = 1;
  public price: number = 0;
  public extraBag: boolean[] = [];
  public seats: Seat[] = [];
  public seatclass: string[] = [];
  public chseat: Seat[] = [];
  public flightId: number = 0;

  passengerForm: FormGroup | undefined;
  submitted = false;

  options = [
    { id: 0, name: 'Nessun bagaglio aggiuntivo', price: 0.00 }
  ];

  selectedOption: number[] = [];

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      this.ticketCount = parseInt(params['ticketCount'] || '1', 10);
      this.price = parseFloat(params['price']) || 0.00;
      this.seats = JSON.parse(params['seats'] || '[]');
      this.selectedOption = new Array(this.ticketCount).fill(0);
      this.chseat = JSON.parse(params['chseat'] || '[]');
      this.seatclass = JSON.parse(params['seatclass'] || '[]');
      this.flightId = params['flightId'];
      let extraBagPrice = parseFloat(params['extraBagPrice']) || 0.00;

      this.options.push({ id: 1, name: 'Bagaglio aggiuntivo', price: extraBagPrice });

      const passengersArray: FormArray = this.fb.array([]);

      for (let i = 0; i < this.ticketCount; i++) {
        passengersArray.push(
          this.fb.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            dob: ['', Validators.required],
          })
        );
      }

      this.passengerForm = this.fb.group({
        passengers: passengersArray,
      });

      this.extraBag = new Array(this.ticketCount).fill(false);
    });
  }

  // Selezione dell'opzione per il bagaglio
  selectOption(index: number, i: number) {
    if (this.selectedOption[i] !== index) {
      this.selectedOption[i] = index;
      if (index === 1) {
        this.price += this.options[index].price;
        this.extraBag[i] = true;
      } else {
        this.price -= this.options[1].price;
        this.extraBag[i] = false;
      }
    }
  }

  getNameArray(): string[] {
    return this.passengers.controls.map(control => control.get('name')?.value || '');
  }

  getSurnameArray(): string[] {
    return this.passengers.controls.map(control => control.get('surname')?.value || '');
  }

  getDobArray(): string[] {
    return this.passengers.controls.map(control => control.get('dob')?.value || '');
  }

  // Getter per il FormArray 'passengers'
  get passengers() {
    return this.passengerForm?.get('passengers') as FormArray;
  }

  // Funzione per ottenere un FormGroup da 'passengers'
  getPassengerGroup(index: number): FormGroup {
    return this.passengers.at(index) as FormGroup;
  }

  get pf() {
    return this.passengerForm?.controls;
  }
}
