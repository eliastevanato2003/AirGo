import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../../navbar/navbar.component";
import { TicketBarComponent } from "../ticket-bar/ticket-bar.component";
import { FooterComponent } from "../../../footer/footer.component";

@Component({
  selector: 'app-ticket-summary',
  templateUrl: './ticket-summary.component.html',
  styleUrls: ['./ticket-summary.component.css'],
  imports: [CurrencyPipe, ReactiveFormsModule, NavbarComponent, TicketBarComponent, FooterComponent]
})
export class TicketSummaryComponent implements OnInit {
  selectedSeat = '6C';
  baggageHand = 'Solo borsa piccola';
  baggageChecked = 'Bagaglio da 10 kg';
  totalPrice = 10.5 + 0 + 17.49;

  public paymentForm!: FormGroup;
  confirmed = false;

  constructor(private fb: FormBuilder) {}

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
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }

  get f() {
    return this.paymentForm.controls;
  }
}
