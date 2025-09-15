import { Component } from '@angular/core';
import { Seat } from '../../../models/user/seat.model';
import { NgClass, NgFor } from '@angular/common';
import { NavbarComponent } from "../../../navbar/navbar.component";
import { TicketBarComponent } from "../ticket-bar/ticket-bar.component";
import { FooterComponent } from "../../../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { FlightService } from '../../../services/user/flight.service';
import { FlightStatus } from '../../../models/user/flight.model';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
  imports: [NgClass, NavbarComponent, TicketBarComponent, FooterComponent, FormsModule, NgFor]
})
export class SeatSelectionComponent {
  seats: Seat[] = [];

  public ticketCount: number = 1;

  private planeId: number = 0;
  private flight: FlightStatus | null = null;

  constructor(private router: Router, private flightService: FlightService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.planeId = params['id'];
      });
    this.getPlaneSeats();
  }

  // TODO: get per avere il numero di righe e colonne dell'aereo (id in queryParams)
  getPlaneSeats() {
    this.flightService.getFlightStatus(this.planeId).subscribe({
      next: (response) => {
        this.flight = response[0];
        this.generateSeats();
      },
      error: (error) => {
        console.error('getPlanes error:', error);
        // Gestisci l'errore, magari mostrando un messaggio all'utente
      }
    });
  }

  // TODO: get dei posti già acquistati e inserirli in this.seats
  generateSeats() {
    // FIRST CLASS
    this.seats.push({
      id: '00',
      row: 0,
      column: '0',
      type: 'firstclass',
      price: this.flight!.CostoPC,
      selected: false
    });

    // BUSINESS
    let row = 1;
    for (row; row <= this.flight!.RigheB; row++) {
      for (let col = 0; col < this.flight!.ColonneB; col++) {
        this.seats.push({
          id: `${row}${col}`,
          row,
          column: String.fromCharCode(65 + col),
          type: 'business',
          price: this.flight!.CostoB,
          selected: false
        });
      }
    }

    const bRow = row;

    // ECONOMY
    for (row; row <= this.flight!.RigheE + bRow; row++) {
      for (let col = 0; col < this.flight!.ColonneE; col++) {
        this.seats.push({
          id: `${row}${col}`,
          row,
          column: String.fromCharCode(65 + col),
          type: 'economy',
          price: this.flight!.CostoE,
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

  get groupedSeats() {
    const grouped: { row: number, seats: Seat[] }[] = [];

    // Raggruppa i posti per riga
    const seatMap = new Map<number, Seat[]>();

    for (const seat of this.seats) {
      if (!seatMap.has(seat.row)) {
        seatMap.set(seat.row, []);
      }
      seatMap.get(seat.row)!.push(seat);
    }

    // Ordina le righe per numero crescente
    const sortedRows = Array.from(seatMap.entries()).sort((a, b) => a[0] - b[0]);

    for (const [row, seats] of sortedRows) {
      // Ordina le colonne per lettere (A, B, C, ...)
      seats.sort((a, b) => a.column.localeCompare(b.column));
      grouped.push({ row, seats });
    }

    return grouped;
  }
}
