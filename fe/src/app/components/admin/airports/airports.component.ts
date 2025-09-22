import { Component, OnInit } from '@angular/core';
import { Airport, NewAirport } from '../../../models/admin/airport.model';
import { AirportService } from '../../../services/admin/airport.service';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent} from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

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
  filterForm: FormGroup;
  editAirportForm!: FormGroup;

  constructor(private router: Router, private authService:AuthService,private airportservice: AirportService, private fb: FormBuilder){
    const token=this.authService.getToken();
    if(!token){
      this.router.navigate(['/login']);
    }
    this.newAirportForm = this.fb.group({
      city: ['', Validators.required],
      country: ['', [Validators.required]],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
    });
    this.filterForm= this.fb.group({
      id:['', Validators.min(0)],
      city: [''],
      country: [''],
      code: [''],
    })
  }

   ngOnInit(): void {
    this.loadAirports();
  }

  private loadAirports(filters:any={}): void{
    this.airportservice.getAirports(filters).subscribe({
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
        this.filtra();
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
          this.filtra();
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

  saveEdit(): void {
    if (!this.selectedairport || this.editAirportForm.invalid) return;

    const f = this.editAirportForm.value;
    const updatedAirport: any = {};

    if (f.name !== this.selectedairport.Nome) {
      updatedAirport.name = f.name;
    }
    if (f.city !== this.selectedairport.Citta) {
      updatedAirport.city = f.city;
    }
    if (f.country !== this.selectedairport.Nazione) {
      updatedAirport.country = f.country;
    }
    if (f.code !== this.selectedairport.CodiceIdentificativo) {
      updatedAirport.identificationcode = f.code;
    }

    if (Object.keys(updatedAirport).length === 0) {
      this.closeEdit();
      return;
    }

    this.airportservice.updateAirport(this.selectedairport.IdAeroporto, updatedAirport).subscribe({
      next: () => {
        alert('Aeroporto aggiornato con successo');
        this.closeEdit();
        this.filtra();
        this.closeManage();
      },
      error: (err) => {
        console.error('Errore aggiornamento aeroporto', err);
        alert(err.error?.message || 'Errore durante l\'aggiornamento');
      }
    });
  }


  openEdit(): void {
    if(!this.selectedairport)return;    
    
    this.editAirportForm = this.fb.group({
      name: [this.selectedairport.Nome || '', Validators.required],
      city: [this.selectedairport.Citta || '', Validators.required],
      country: [this.selectedairport.Nazione || '', Validators.required],
      code: [this.selectedairport.CodiceIdentificativo || '', Validators.required],
    });
    this.showEdit = true;
  }

  closeEdit(): void {
    this.showEdit = false;
    this.editAirportForm.reset();
  }

  filtra(): void {
    const filters = { ...this.filterForm.value };

    Object.keys(filters).forEach(key => {
      if (filters[key] === '' || filters[key] === null) {
        delete filters[key];
      }
    });

    this.loadAirports(filters);
  }

  reset(): void {
    this.filterForm.reset();
    this.loadAirports();
  }
}
