import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Seat } from '../../../models/user/seat.model';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { TicketBarComponent } from '../ticket-bar/ticket-bar.component';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-hand-baggage',
  templateUrl: './baggage-selection.component.html',
  styleUrls: ['./baggage-selection.component.css'],
  imports: [NavbarComponent, FooterComponent, TicketBarComponent, NgClass, NgFor, ReactiveFormsModule, RouterLink, RouterLinkActive],
  standalone: true
})
export class BaggageSelectionComponent {
  public ticketCount: number = 1;
  public price: number = 0;
  public extraBag: boolean[] = [];
  public seats: Seat[] = [];
  passengerForm?: FormGroup;
  submitted = false;

  options = [
    { id: 0, name: 'Nessun bagaglio aggiuntivo', price: 0.00 },
    { id: 1, name: 'Bagaglio aggiuntivo', price: 17.49 }
  ];

  selectedOption: number[] = [];

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    // Creazione dinamica del form
    this.route.queryParams.subscribe(params => {
      this.ticketCount = params['ticketCount'];
      this.price = parseInt(params['price']);
      this.seats = params['seats'];
      this.selectedOption = new Array(this.ticketCount).fill(0);

      const passengersArray: FormArray = this.fb.array([]);  // Crea un nuovo FormArray

      // Aggiungi dinamicamente i FormGroup per ciascun passeggero
      for (let i = 0; i < this.ticketCount; i++) {
        passengersArray.push(
          this.fb.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            dob: ['', Validators.required],
          })
        );
      }

      // Inizializza il FormGroup principale
      this.passengerForm = this.fb.group({
        passengers: passengersArray,
      });
    });

    this.extraBag = new Array(this.ticketCount).fill(false);
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
