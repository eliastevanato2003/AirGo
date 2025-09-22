import { Component } from '@angular/core';
import { AirlineService } from '../../../services/airline/airline.service';
import { ActivatedRoute } from '@angular/router';
import { FlightStatus } from '../../../models/user/flight.model';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routestats',
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './routestats.component.html',
  styleUrl: './routestats.component.css'
})
export class RoutestatsComponent {
  public stats: FlightStatus[] = [];

  constructor(private airlineService: AirlineService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const routeId = params['id'];
      if (routeId) {
        this.fetchRouteStats(routeId);
      }
    });
  }

  fetchRouteStats(routeId: string) {
    this.airlineService.getRouteStats(routeId).subscribe((response) => {
      this.stats = response;
    });
  }
}
