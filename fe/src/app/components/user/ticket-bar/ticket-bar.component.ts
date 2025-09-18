import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-bar',
  templateUrl: './ticket-bar.component.html',
  styleUrls: ['./ticket-bar.component.css'],
  imports: [],
  standalone: true
})
export class TicketBarComponent {
  constructor(private router: Router) {}
}
