import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { AuthService } from "../auth.service";
import { TicketDB } from "../../models/user/ticket.model";

@Injectable({ providedIn: 'root' })
export class TicketService {
    constructor(private http: HttpClient, private authService: AuthService) { }

    getTickets(filters?: { id?: number; flight?: number;}) {
        const url = 'http://localhost:3000/api/tickets/getTickets';

        const token = this.authService.getToken();

        // Crea l'intestazione di autorizzazione
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        let params = new HttpParams();
        if (filters) {
            if (filters.id) params = params.set('id', filters.id.toString());
            if (filters.flight) params = params.set('flight', filters.flight.toString());
         }

        // Richiesta dei dati
        return this.http.get<TicketDB[]>(url, { headers, params }).pipe(tap());
    }

    addTicket(idFlight: number, name: string, surname: string, dob: string, seatclass: string, extraBaggages: number, chseat: boolean, price: number, row?: string, col?: string) {
        const url = 'http://localhost:3000/api/tickets/newTicket';

        const token = this.authService.getToken();

        // Crea l'intestazione di autorizzazione
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        // Filtri della get
        const message = {
            flight: idFlight,
            name: name,
            surname: surname,
            dob: dob,
            clas: seatclass,
            nextrabag: extraBaggages,
            chseat: chseat,
            price: price,
            row: row,
            col: col
        };

        // Richiesta dei dati
        return this.http.post(url, message, { headers: headers }).pipe(tap());
    }

    updateTicket(
        id: number,
        name: string,
        surname: string,
        dob: string
    ){
       const url = 'http://localhost:3000/api/tickets/updateTicket';

        const token = this.authService.getToken();

        const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        });

         const body = {
            id: id,
            name: name,
            surname: surname,
            dob: dob
        };

        return this.http.post(url, body, { headers }).pipe(tap());
    }

}