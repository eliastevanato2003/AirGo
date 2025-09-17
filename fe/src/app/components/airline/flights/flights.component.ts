import { Component, OnInit } from '@angular/core';
import { Airline, NewAirline } from '../../../models/admin/airline.model';
import { AirlineService } from '../../../services/admin/airline.service';
import { NavbarComponent} from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-flights',
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent implements OnInit {
  showCreate = false;
  planes: any[] = [];
  routes: any[] = [];
  flights: any[] = [];
  newFlightForm: FormGroup;

  constructor(private http: HttpClient, private authService: AuthService, private airlineService: AirlineService, private fb: FormBuilder, private router: Router) {
    this.newFlightForm = this.fb.group({
      plane: ['', Validators.required],
      route: ['', Validators.required],
      schdepdate: ['', Validators.required],
      scharrdate: ['', Validators.required],
      pcprize: ['', [Validators.required, Validators.min(0)]],
      bprize: ['', [Validators.required, Validators.min(0)]],
      eprize: ['', [Validators.required, Validators.min(0)]],
      ecprize: ['', [Validators.required, Validators.min(0)]],
      bagprize: ['', [Validators.required, Validators.min(0)]],
      lrprize: ['', [Validators.required, Validators.min(0)]],
      scprize: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
      const token = this.authService.getToken();

      console.log('Token JWT:', token);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      
  }
}
