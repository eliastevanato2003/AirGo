import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { TicketDB } from '../../../models/user/ticket.model';
import { TicketService } from '../../../services/user/ticket.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-tickets',
  imports: [NavbarComponent, FooterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './user-tickets.component.html',
  styleUrl: './user-tickets.component.css'
})
export class UserTicketsComponent implements OnInit{
  tickets: TicketDB[] |null=null;
  filterForm: FormGroup;
  updateForm!: FormGroup;
  showManage=false;
  selectedTicket: TicketDB |null=null;
  expandedSection: string |null=null;
  showEdit=false;

  constructor(private ticketService: TicketService, private fb: FormBuilder,) {
    this.filterForm = this.fb.group({
    idTicket:[''],
    idFlight:['']
  });    
  }

  ngOnInit(): void {
      this.loadTickets();
  }

  loadTickets(filters: any = {}): void {
    this.ticketService.getTickets(filters).subscribe({
      next: (response) => {
        this.tickets = response;
      },
      error: (err) => {
        console.error('Errore nel caricamento dei biglietti:', err);
      }
    });
  }

  filtra(): void {
    const formValues = this.filterForm.value;
    const filters: any = {};
    if (formValues.idTicket) {
      filters.id = formValues.idTicket; 
    }
    if (formValues.idFlight) {
      filters.flight = formValues.idFlight; 
    }

    console.log("Filtri inviati al service:", filters);

    this.loadTickets(filters);
  }


  reset(): void {
    this.filterForm.reset();
    this.loadTickets();
  }

  gestisci(ticket: TicketDB): void {
      this.selectedTicket = ticket;
      this.showManage = true;
    }
  
  closeManage(): void {
    this.showManage = false;
    this.selectedTicket = null;
    this.expandedSection=null;
  }

  saveEdit(): void {
  if (!this.selectedTicket || this.updateForm.invalid) return;

  const f = this.updateForm.value;

  // converte DoB di selectedTicket in YYYY-MM-DD
  const originalDob = this.selectedTicket.DoB
    ? new Date(this.selectedTicket.DoB).toISOString().split('T')[0]
    : '';

  // controlla se ci sono modifiche
  if (
    f.Nome === this.selectedTicket.Nome &&
    f.Cognome === this.selectedTicket.Cognome &&
    f.DoB === originalDob
  ) {
    this.closeEdit();
    return;
  }

  // continua con l'update
  this.ticketService.updateTicket(
    this.selectedTicket.IdBiglietto,
    f.Nome,
    f.Cognome,
    f.DoB
  ).subscribe({
    next: () => {
      alert("Informazioni biglietto aggiornate con successo");
      this.closeEdit();
      this.filtra();
      this.closeManage();
    },
    error: (err) => {
      console.error("Errore aggiornamento biglietto", err);
      alert(err.error?.message || "Errore durante l'aggiornamento del biglietto");
    }
  });
}

  
  closeEdit(): void {
    this.showEdit = false;
    this.updateForm.reset();
  }

  openEdit(): void {
    if (!this.selectedTicket) return;

    // converti DoB in YYYY-MM-DD
    let dobFormatted = '';
    if (this.selectedTicket.DoB) {
      const date = new Date(this.selectedTicket.DoB);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      dobFormatted = `${yyyy}-${mm}-${dd}`;
    }

    this.updateForm = this.fb.group({
      Nome: [this.selectedTicket.Nome || '', Validators.required],
      Cognome: [this.selectedTicket.Cognome || '', Validators.required],
      DoB: [dobFormatted, Validators.required] 
    });

    this.showEdit = true;
  }


  toggleSection(section: string): void {
    if (this.expandedSection === section) {
      // Se la sezione cliccata è già aperta, chiudila
      this.expandedSection = null;
    } else {
      // Altrimenti apri la nuova sezione
      this.expandedSection = section;
    }
  }

}
