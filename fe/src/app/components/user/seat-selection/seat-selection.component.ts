import { Component, OnInit } from '@angular/core';
import { Seat } from '../../../models/user/seat.model';
import { NgClass, CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../navbar/navbar.component";
import { TicketBarComponent } from "../ticket-bar/ticket-bar.component";
import { FooterComponent } from "../../../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { FlightService } from '../../../services/user/flight.service';
import { FlightStatus } from '../../../models/user/flight.model';
import { TicketService } from '../../../services/user/ticket.service';
import { ExtraLegRow } from '../../../models/airline/model.model';
import { TicketDB } from '../../../models/user/ticket.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
  imports: [CommonModule, NgClass, NavbarComponent, TicketBarComponent, FooterComponent, FormsModule],
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

  public businessLabel: boolean = false;
  public economyLabel: boolean = false;

  public flightId: number = 0;
  public flight: FlightStatus | null = null;

  public unavailableBusiness: boolean = false;
  public unavailableEconomy: boolean = false;

  constructor(private flightService: FlightService, private route: ActivatedRoute, private ticketService: TicketService, private authService: AuthService, private router: Router) {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
    }
  }

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
      }
    });
  }

  generateSeats() {
    if (!this.flight) return;

    this.ticketService.getTickets({ flight: this.flight.IdVolo }).subscribe({
      next: (bookedSeats: TicketDB[]) => {
        this.seats = [];

        console.log('Booked Seats:', bookedSeats);

        this.unavailableBusiness = this.flight!.PostiOccB === this.flight!.PostiB;
        this.unavailableEconomy = this.flight!.PostiOccE === this.flight!.PostiE;

        // PRIMA CLASSE
        this.seats.push({
          id: '00',
          row: 0,
          displayRow: 0,
          column: '0',
          type: 'firstclass',
          price: this.flight!.CostoPC,
          selected: false,
          unavailable: this.flight!.PostiOccPc === this.flight!.PostiPc,
        });

        // BUSINESS
        for (let row = 1; row <= this.flight!.RigheB; row++) {
          for (let col = 0; col < this.flight!.ColonneB; col++) {
            const colLetter = String.fromCharCode(65 + col);
            this.seats.push({
              id: `B${row}${col}`,
              row: row,
              displayRow: row,
              column: colLetter,
              type: 'business',
              price: this.flight!.CostoB,
              selected: false,
              unavailable: bookedSeats.some(ticket => ticket.RigPosto === row && ticket.ColPosto === colLetter && ticket.Classe === 'Business'),
              extraLegroom: this.extraLegRoom.some(seat => seat.NRiga === row)
            });
          }
        }

        // ECONOMY
        const economyOffset = this.flight!.RigheB;

        for (let row = 1; row <= this.flight!.RigheE; row++) {
          const realRow = row + economyOffset;
          for (let col = 0; col < this.flight!.ColonneE; col++) {
            const colLetter = String.fromCharCode(65 + col);
            this.seats.push({
              id: `E${realRow}${col}`,
              row: realRow,
              displayRow: row,
              column: colLetter,
              type: 'economy',
              price: this.flight!.CostoE,
              selected: false,
              unavailable: bookedSeats.some(ticket => ticket.RigPosto === row + economyOffset && ticket.ColPosto === colLetter && ticket.Classe === 'Economy'),
              extraLegroom: this.extraLegRoom.some(seat => seat.NRiga === row)
            });
          }
        }
      },
      error: (error) => {
        console.error('getTickets error:', error);
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

  getSeat(row: number, col: string): Seat | undefined {
    return this.seats.find(seat => seat.row === row && seat.column === col);
  }

  // Funzione per selezionare un posto casuale in una classe specifica
  selectRandomSeat(classType: string) {
    // Filtra i posti per il tipo specificato (business o economy)
    const availableSeats = this.seats.filter(seat => seat.type === classType && !seat.selected && !seat.unavailable);

    if (availableSeats.length > 0) {
      if (classType === 'business') {
        if (this.businessLabel) {
          this.casualSeats--;
          this.businessLabel = false;
          this.price -= this.flight!.CostoB;
          const index = this.seatclass.indexOf('Business');
          if (index > -1) {
            this.seatclass.splice(index, 1);
          }
        } else {
          if (this.getSelectedSeats().length + this.casualSeats < this.ticketCount) {
            this.businessLabel = true;
            this.price += this.flight!.CostoB;
            this.seatclass.push('Business');
            this.casualSeats++;
          }
        }
      } else {
        if (this.economyLabel) {
          this.casualSeats--;
          this.economyLabel = false;
          this.price -= this.flight!.CostoE;
          const index = this.seatclass.indexOf('Economy');
          if (index > -1) {
            this.seatclass.splice(index, 1);
          }
        } else {
          if (this.getSelectedSeats().length + this.casualSeats < this.ticketCount) {
            this.economyLabel = true;
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

  submit() {
  const selectedSeats = this.getSelectedSeats();

  if ((selectedSeats.length + this.casualSeats) < this.ticketCount) {
    alert("Seleziona tutti i posti prima di continuare.");
    return;
  }

  selectedSeats.forEach(seat => {
    this.seatclass.push(seat.type === 'business' ? 'Business' : seat.type === 'economy' ? 'Economy' : 'First Class');
  });

  this.router.navigate(['/baggageselection'], {
    queryParams: {
      flightId: this.flightId,
      chseat: JSON.stringify(this.chseat),
      seatclass: JSON.stringify(this.seatclass),
      ticketCount: JSON.stringify(this.ticketCount),
      price: JSON.stringify(this.price),
      seats: JSON.stringify(selectedSeats),
      extraBagPrice: JSON.stringify(this.flight?.CostoBag)
    }
  });
}
}
