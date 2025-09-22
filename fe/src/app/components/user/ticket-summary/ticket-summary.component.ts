import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../../navbar/navbar.component";
import { TicketBarComponent } from "../ticket-bar/ticket-bar.component";
import { FooterComponent } from "../../../footer/footer.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Seat } from '../../../models/user/seat.model';
import { TicketService } from '../../../services/user/ticket.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-ticket-summary',
  templateUrl: './ticket-summary.component.html',
  styleUrls: ['./ticket-summary.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, TicketBarComponent, FooterComponent],
  standalone: true
})
export class TicketSummaryComponent implements OnInit {
  public selectedSeats: Seat[] = [];
  public baggageHand = 'Solo borsa piccola';
  public baggageChecked = 'Nessuno';
  public totalPrice = 0;
  public extraBags = 0;
  public chseat: Seat[] = [];
  public seatclass: string[] = [];
  public ticketCount: number = 1;
  public flightId: number = 0;
  public names: string[] = [];
  public surnames: string[] = [];
  public dobs: string[] = [];

  public paymentForm!: FormGroup;
  public confirmed = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private ticketService: TicketService, private authService: AuthService, private router: Router) {
    const token = this.authService.getToken();
    if(!token) {
      this.router.navigate(['/login']);
    }
    this.route.queryParams.subscribe(params => {
      this.totalPrice = parseFloat(params['price'] || '0.00');
      this.selectedSeats = JSON.parse(params['seats'] || '[]');
      JSON.parse(params['extraBag'] || '[]').forEach((res: boolean) => {
        if (res) this.extraBags++;
      });
      this.baggageChecked = this.extraBags === 1 ? '1 Bagaglio da 10 kg' : this.extraBags === 0 ? 'Nessuno' : this.extraBags + ' Bagagli da 10 kg';
      this.chseat = JSON.parse(params['chseat'] || '[]');
      this.seatclass = JSON.parse(params['seatclass'] || '[]');
      this.ticketCount = parseInt(params['ticketCount']);
      this.flightId = parseInt(params['flightId']);
      this.names = JSON.parse(params['names'] || '[]');
      this.surnames = JSON.parse(params['surnames'] || '[]');
      this.dobs = JSON.parse(params['dobs'] || '[]');
    });
  }

  ngOnInit() {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }

  confirmPayment() {
    if (this.paymentForm.valid) {
      this.confirmed = true;
      for (let i = 0; i < this.ticketCount; i++) {
        const chseat = !!this.chseat.find(seat => seat.id === this.selectedSeats[i].id);
        this.ticketService.addTicket(this.flightId, this.names[i], this.surnames[i], this.dobs[i], this.seatclass[i], this.extraBags, chseat, this.totalPrice, chseat ? this.selectedSeats[i].row.toString() : undefined, chseat ? this.selectedSeats[i].column : undefined).subscribe({
          next: (res) => {
            console.log('Biglietto creato correttamente', res);
          },
          error: (err) => {
            console.error('Errore nella creazione del biglietto', err);
          }
        });
      }
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }

  get f() {
    return this.paymentForm.controls;
  }

  get seats() {
    return this.selectedSeats.map(seat => {
      if (seat.row === 0) return 'Prima Classe';
      else return seat.row + seat.column;
    });
  }
}
