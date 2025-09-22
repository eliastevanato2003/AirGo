import { Component } from '@angular/core';
import { AirlineService } from '../../../services/airline/airline.service';
import { Stats } from '../../../models/airline/stats.model';
import { NavbarComponent } from "../../../navbar/navbar.component";
import { FooterComponent } from "../../../footer/footer.component";
import { CurrencyPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-stats',
  imports: [NavbarComponent, FooterComponent, CurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  public stats: Stats[] = [];
  constructor(private airlineService: AirlineService) {}

  ngOnInit(): void {
    this.airlineService.getStats().subscribe((response) => {
      this.stats = response;
    });
  }
}
