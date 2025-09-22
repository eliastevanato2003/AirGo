import { Component, OnInit } from '@angular/core';
import { Seat } from '../../../models/user/seat.model';
import { NgClass, JsonPipe, CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../navbar/navbar.component";
import { TicketBarComponent } from "../ticket-bar/ticket-bar.component";
import { FooterComponent } from "../../../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive } from "@angular/router";
import { FlightService } from '../../../services/user/flight.service';
import { FlightStatus } from '../../../models/user/flight.model';
import { TicketService } from '../../../services/user/ticket.service';
import { ExtraLegRow } from '../../../models/airline/model.model';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
  imports: [CommonModule, NgClass, NavbarComponent, TicketBarComponent, FooterComponent, FormsModule, RouterLink, RouterLinkActive, JsonPipe],
  standalone: true
})
export class SeatSelectionComponent implements OnInit {
  seats: Seat[] = [];

  public ticketCount: number = 1;
  public casualSeats: number = 0;
  public price: number = 0;

  public seatclass: string[] = [];
  public chseat: Seat[] = [];
  public extraLegRoom: ExtraLegRow[] = [];

  public businessLabel: string = '';
  public economyLabel: string = '';

  public flightId: number = 0;
  public flight: FlightStatus | null = null;

  constructor(private flightService: FlightService, private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.flightId = params['id'];
      this.getPlaneSeats();
    });
  }

  getPlaneSeats() {
    this.flightService.getFlightStatus(this.flightId).subscribe({
      next: (response) => {
        this.flight = response[0];
        this.flightService.getExtraLegRoom(this.flight.IdModello).subscribe({
          next: (response) => {
            this.extraLegRoom = response[0].RigheExtraLeg;
            this.generateSeats();
          },
          error: (error) => {
            console.error('getExtraLegRoom error: ', error);
          }
        });
      },
      error: (error) => {
        console.error('getPlanes error:', error);
        // Gestisci l'errore, magari mostrando un messaggio all'utente
      }
    });
  }

  generateSeats() {
    this.ticketService.getTickets(this.flight!.IdVolo).subscribe({
      next: (response) => {
        const bookedSeats = response.tickets ? response.tickets : [];
        // bookedSeats = response;

        // Pulisci l'array dei posti
        this.seats = [];
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
              selected: false,
              unavailable: bookedSeats.some((ticket: any) => ticket.RigPosto === row && ticket.ColPosto === String.fromCharCode(65 + col)),
              extraLegroom: this.extraLegRoom.some((seat: any) => seat.NRiga === row)
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
              selected: false,
              unavailable: bookedSeats.some((ticket: any) => ticket.RigPosto === row && ticket.ColPosto === String.fromCharCode(65 + col)),
              extraLegroom: this.extraLegRoom.some((seat: any) => seat.NRiga === row)
            });
          }
        }
      },
      error: (error) => {
        console.error('getTickets error:', error);
        // Gestisci l'errore, magari mostrando un messaggio all'utente
      }
    });
  }

  selectSeat(seat: Seat) {
    if (seat.unavailable) {
      return; // Non fare nulla se il posto non è disponibile
    }
    // Verifica che non si superi il numero di biglietti
    if (this.getSelectedSeats().length + this.casualSeats < this.ticketCount) {
      seat.selected = !seat.selected;
      if (!seat.selected) {
        if (seat.type == 'firstclass') {
          this.price -= seat.price;
        } else {
          if (seat.extraLegroom) {
            this.price -= seat.price + this.flight!.CostoSceltaPosto + this.flight!.CostoLegRoom;
          } else {
            this.price -= seat.price + this.flight!.CostoSceltaPosto;
          }
        }
        const index = this.chseat.indexOf(seat);
        if (index > -1) {
          this.chseat.splice(index, 1);
        }
      } else {
        if (seat.type == 'firstclass') {
          this.price += seat.price;
        } else {
          if (seat.extraLegroom) {
            this.price += seat.price + this.flight!.CostoSceltaPosto + this.flight!.CostoLegRoom;
          } else {
            this.price += seat.price + this.flight!.CostoSceltaPosto;
          }
        }
        this.chseat.push(seat);
      }
    } else if (seat.selected) {
      seat.selected = false; // Deseleziona se è già selezionato
      if (seat.type == 'firstclass') {
        this.price -= seat.price;
      } else {
        if (seat.extraLegroom) {
          this.price -= seat.price + this.flight!.CostoSceltaPosto + this.flight!.CostoLegRoom;
        } else {
          this.price -= seat.price + this.flight!.CostoSceltaPosto;
        }
      }
      const index = this.chseat.indexOf(seat);
      if (index > -1) {
        this.chseat.splice(index, 1);
      }
    }
  }

  getSelectedSeats() {
    return this.seats.filter(seat => seat.selected);
  }

  getSeatClass(): string[] {
    this.seatclass = []; // Reset the array
    this.getSelectedSeats().forEach(seat => {
      if (seat.type === 'firstclass') {
        this.seatclass.push('Prima');
      } else if (seat.type === 'business') {
        this.seatclass.push('Business');
      } else {
        this.seatclass.push('Economy');
      }
    });
    return this.seatclass;
  }

  getSeat(row: number, col: string): Seat | undefined {
    return this.seats.find(seat => seat.row === row && seat.column === col);
  }

  // Funzione per selezionare un posto casuale in una classe specifica
  selectRandomSeat(classType: string) {
    // Filtra i posti per il tipo specificato (business o economy)
    const availableSeats = this.seats.filter(seat => seat.type === classType && !seat.selected && !seat.unavailable);

    if (availableSeats.length > 0) {
      // Se ci sono posti disponibili, seleziona un posto casuale
      if (classType === 'business') {
        if (this.businessLabel === 'selected') {
          this.casualSeats--;
          this.businessLabel = '';
          this.price -= this.flight!.CostoB;
          const index = this.seatclass.indexOf('Business');
          if (index > -1) {
            this.seatclass.splice(index, 1);
          }
        } else {
          if (this.getSelectedSeats().length + this.casualSeats < this.ticketCount) {
            this.businessLabel = 'selected';
            this.price += this.flight!.CostoB;
            this.seatclass.push('Business');
            this.casualSeats++;
          }
        }
      } else {
        if (this.economyLabel === 'selected') {
          this.casualSeats--;
          this.economyLabel = '';
          this.price -= this.flight!.CostoE;
          const index = this.seatclass.indexOf('Economy');
          if (index > -1) {
            this.seatclass.splice(index, 1);
          }
        } else {
          if (this.getSelectedSeats().length + this.casualSeats < this.ticketCount) {
            this.economyLabel = 'selected';
            this.price += this.flight!.CostoE;
            this.seatclass.push('Economy');
            this.casualSeats++;
          }
        }
      }
    } else {
      alert(`Non ci sono posti disponibili in ${classType}`);
    }
  }

  // TODO: aggiungere i seat casuali in this.seats
  // Quando il numero di biglietti cambia
  onTicketCountChange() {
    // Ottieni i posti selezionati
    const selectedSeats = this.getSelectedSeats();

    // Se il numero di biglietti è inferiore ai posti selezionati, cancella i posti in eccesso
    if (selectedSeats.length + this.casualSeats > this.ticketCount) {
      let excessSeats = selectedSeats.slice(this.ticketCount);
      excessSeats.forEach(seat => {
        seat.selected = false;
        this.price -= seat.price + this.flight!.CostoSceltaPosto;
      });
    }
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
