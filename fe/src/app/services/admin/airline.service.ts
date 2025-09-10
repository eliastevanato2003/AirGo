import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { Airline, NewAirline } from "../../models/admin/airline.model";
import { tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AirlineService {

    private airlines: Airline[] = [];

    constructor(private http: HttpClient, private authService: AuthService) { }

    getAirlines() {
        const url = 'http://localhost:3000/api/airlines/getAirlines'

        const token = this.authService.getToken();

        // Crea l'intestazione di autorizzazione
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        return this.http.get<any[]>(url, { headers: headers }).pipe(
            tap()
        );
    }

    addAirline(airline: NewAirline) {
        const url = 'http://localhost:3000/api/airlines/updateAirlines'

        const token = this.authService.getToken();

        // Crea l'intestazione di autorizzazione
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        const message = {
            name: airline.name,
            identificationcode: airline.code,
            email: airline.email,
            password: airline.password
        };

        this.http.post(url, { headers: headers }).subscribe({
            next: () => {
                console.log('Airline aggiunta correttamente');
            },
            error: (error) => {
                console.error('GetAirlines error:', error);
                // Gestisci l'errore, magari mostrando un messaggio all'utente
            }
        });
    }

    deleteAirline(id: number) {

    }
}