import { Component, OnInit } from '@angular/core';
import { Airport, NewAirport } from '../../../models/admin/airport.model';
import { AirportService } from '../../../services/admin/airport.service';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent} from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';

@Component({
  selector: 'app-airports',
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './airports.component.html',
  styleUrl: './airports.component.css',
  standalone: true
})
export class AirportsComponent implements OnInit{
  airports: Airport[] | null=null;
  showModal=false;
  selectedairport: Airport | null = null;
  showManage = false;
  newAirport: NewAirport | null = null;
  newAirportForm: FormGroup;
  showEdit = false;

  constructor(private airportservice: AirportService, private fb: FormBuilder){
    this.newAirportForm = this.fb.group({
      city: ['', Validators.required],
      country: ['', [Validators.required]],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });
  }

   ngOnInit(): void {
    this.loadAirports();
  }

  private loadAirports(): void{
    this.airportservice.getAirports().subscribe({
      next: (airports) => this.airports = airports,
      error: (err) => console.error('Errore caricamento aeroporti', err)
    });
  }

  addAirport(): void {
    if (this.newAirportForm.invalid) return;

    const f = this.newAirportForm.value;

    this.newAirport = {
      city: f.city,
      country: f.country,
      name: f.name,
      identificationcode: f.code,
    }
      

    this.airportservice.newAirport(this.newAirport).subscribe({
      next: () => {
        alert('Nuovo aeroporto creato');
        this.closeCreate();
        this.loadAirports();
      },
      error: (err) => console.error('Errore creazione aeroporto', err)
    });
  }

  closeCreate(): void{
    this.showModal=false;
    this.newAirportForm.reset();
  }



  deleteAirport(id: number): void {
    if (confirm('Sei sicuro di voler eliminare questo aeroporto?')) {
      this.airportservice.deleteAirport(id).subscribe({
        next: (res) => {
          alert('Aeroporto eliminato con successo');
          this.closeManage();
          this.loadAirports();
        },
        error: (err) => {
          console.error('Errore eliminazione aeroporto', err);
          alert(err.error?.message || 'Errore durante l\'eliminazione');
        }
      });
    }
  }

 gestisci(curr: Airport): void {
     this.selectedairport = curr;
     this.showManage = true;
   }

  closeManage(): void{
    this.showManage=false;
    this.selectedairport=null;
  }
}
