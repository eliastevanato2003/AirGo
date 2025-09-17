import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-bar',
  templateUrl: './ticket-bar.component.html',
  styleUrl: './ticket-bar.component.css',
  standalone: true
})
export class TicketBarComponent {
  constructor(private router: Router) {}
}
