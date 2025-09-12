import { Component } from '@angular/core';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { NgClass } from '@angular/common';
import { TicketBarComponent } from "../ticket-bar/ticket-bar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-hand-baggage',
  templateUrl: './baggage-selection.component.html',
  styleUrls: ['./baggage-selection.component.css'],
  imports: [NavbarComponent, FooterComponent, NgClass, TicketBarComponent]
})
export class BaggageSelectionComponent {
  public passengers = 1;

  options = [
    { id: 0, name: 'Nessun bagaglio aggiuntivo', price: 0.00 },
    { id: 1, name: 'Bagaglio aggiuntivo', price: 17.49 }
  ];

  selectedOption = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
    });
  }

  selectOption(index: number) {
    this.selectedOption = index;
  }
}
