import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable({ providedIn: 'root' })
export class TicketService {
    constructor(private http: HttpClient, private authService: AuthService) { }

    getTickets(flightId: number) {
        const url = 'http://localhost:3000/api/tickets/getTickets';

        const token = this.authService.getToken();

        // Crea l'intestazione di autorizzazione
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        // Filtri della get
        const message = { flight: flightId };

        // Richiesta dei dati
        return this.http.get<{ tickets: [] }>(url, { headers: headers, params: message }).pipe(tap());
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
}