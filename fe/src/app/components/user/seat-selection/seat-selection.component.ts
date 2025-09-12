import { Component } from '@angular/core';
import { Seat } from '../../../models/user/seat.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
  imports: [NgClass]
})
export class SeatSelectionComponent {
  seats: Seat[] = [];

  constructor() {
    this.generateSeats();
  }

  generateSeats() {
    const types = ['economy', 'business', 'firstclass'];
    this.seats.push({
          id: `Prima Classe`,
          row: 0,
          column: '0',
          price: 10.5,  // TODO: prezzo
          type: 'firstclass',
          selected: false
        });
    for (let row = 1; row <= 10; row++) {
      for (let col of ['A', 'B', 'C', 'D', 'E', 'F']) {
        this.seats.push({
          id: `${row}${col}`,
          row,
          column: col,
          price: row === 1 ? 22 : row <= 3 ? 14 : row <= 5 ? 13.5 : 10.5,
          type: row >= 1 && row <=5 ? 'business' : 'economy',
          selected: false
        });
      }
    }
  }

  selectSeat(seat: Seat) {
    this.seats.forEach(s => s.selected = false);
    seat.selected = true;
  }

  getSeat(row: number, col: string): Seat | undefined {
  return this.seats.find(seat => seat.row === row && seat.column === col);
}
}
