import { Component } from '@angular/core';
import { Seat } from '../../../models/user/seat.model';
import { NgClass } from '@angular/common';
import { NavbarComponent } from "../../../navbar/navbar.component";
import { TicketBarComponent } from "../ticket-bar/ticket-bar.component";
import { FooterComponent } from "../../../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
  imports: [NgClass, NavbarComponent, TicketBarComponent, FooterComponent, FormsModule]
})
export class SeatSelectionComponent {
  seats: Seat[] = [];

  public ticketCount: number = 1;
  public rows: number = 10;
  public cols: number = 6;

  constructor(private router: Router) {
    this.generateSeats();
  }

  // TODO: get per avere il numero di righe e colonne dell'aereo (id in queryParams)
  getPlaneSeats() {}

  // TODO: get dei posti già acquistati e inserirli in this.seats
  generateSeats() {
    const types = ['economy', 'business', 'firstclass'];
    this.seats.push({
      id: `0'0'`,
      row: 0,
      column: '0',
      price: 10.5,  // TODO: prezzo
      type: 'firstclass',
      selected: false
    });
    for (let row = 1; row <= this.rows; row++) {
      for (let col = 0; col <= this.cols; col++) {
        this.seats.push({
          id: `${row}${col}`,
          row,
          column: String.fromCharCode(65 + col),
          price: row === 1 ? 22 : row <= 3 ? 14 : row <= 5 ? 13.5 : 10.5,
          type: row >= 1 && row <= 5 ? 'business' : 'economy',
          selected: false
        });
      }
    }
  }

  selectSeat(seat: Seat) {
    // Verifica che non si superi il numero di biglietti
    if (this.getSelectedSeats().length < this.ticketCount) {
      seat.selected = !seat.selected;
    } else if (seat.selected) {
      seat.selected = false; // Deseleziona se è già selezionato
    }
  }

  getSelectedSeats() {
    return this.seats.filter(seat => seat.selected);
  }

  getSeat(row: number, col: string): Seat | undefined {
    return this.seats.find(seat => seat.row === row && seat.column === col);
  }

    // Funzione per selezionare un posto casuale in una classe specifica
  selectRandomSeat(classType: string) {
    // Filtra i posti per il tipo specificato (business o economy)
    const availableSeats = this.seats.filter(seat => seat.type === classType && !seat.selected);
    
    if (availableSeats.length > 0) {
      // Se ci sono posti disponibili, seleziona un posto casuale
      const randomSeat = availableSeats[Math.floor(Math.random() * availableSeats.length)];
      randomSeat.selected = true;
    } else {
      console.log(`Non ci sono posti disponibili in ${classType}`);
    }
  }

  // Quando il numero di biglietti cambia
  onTicketCountChange() {
    // Ottieni i posti selezionati
    const selectedSeats = this.getSelectedSeats();
    
    // Se il numero di biglietti è inferiore ai posti selezionati, cancella i posti in eccesso
    if (selectedSeats.length > this.ticketCount) {
      let excessSeats = selectedSeats.slice(this.ticketCount);
      excessSeats.forEach(seat => seat.selected = false); // Deseleziona i posti in eccesso
    }
  }

  submit() {
    this.router.navigate(['/baggageselection'], { queryParams: { ticketCount: this.ticketCount } });
  }
}
