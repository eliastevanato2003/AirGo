import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ticket-bar',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './ticket-bar.component.html',
  styleUrl: './ticket-bar.component.css'
})
export class TicketBarComponent {
  constructor(private router: Router) {}
}
