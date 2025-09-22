import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-ticket-bar',
  templateUrl: './ticket-bar.component.html',
  styleUrls: ['./ticket-bar.component.css'],
  imports: [NgClass],
  standalone: true
})
export class TicketBarComponent {
  currentStep: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setCurrentStep();
    });
  }

  setCurrentStep() {
    const url = this.router.url;
    if (url.includes('seatselection')) {
      this.currentStep = 'posti';
    } else if (url.includes('baggageselection')) {
      this.currentStep = 'bagagli';
    } else if (url.includes('ticketsummary')) {
      this.currentStep = 'pagamento';
    }
  }


}
