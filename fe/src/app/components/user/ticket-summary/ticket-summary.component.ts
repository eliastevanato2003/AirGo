import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../../navbar/navbar.component";
import { TicketBarComponent } from "../ticket-bar/ticket-bar.component";
import { FooterComponent } from "../../../footer/footer.component";
import { ActivatedRoute } from '@angular/router';
import { Seat } from '../../../models/user/seat.model';

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

  public paymentForm!: FormGroup;
  public confirmed = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.totalPrice = parseInt(params['price']);
      this.selectedSeats = JSON.parse(params['seats'] || '[]');
      JSON.parse(params['extraBag'] || '[]').forEach((res: boolean) => {
        if(res) this.extraBags++;
      });
      this.baggageChecked = this.extraBags === 1 ? '1 Bagaglio da 10 kg' : this.extraBags === 0 ? 'Nessuno' : this.extraBags + ' Bagagli da 10 kg';
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
      const formData = this.paymentForm.value;
      console.log('Payment Confirmed', formData);
      // TODO: Ticket activation
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }

  get f() {
    return this.paymentForm.controls;
  }

  get seats() {
    return this.selectedSeats.map(seat => {
      if(seat.row === 0) return 'Prima Classe';
      else return seat.row + seat.column;
    });
  }
}
