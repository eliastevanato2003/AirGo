import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { tap} from "rxjs";
import { Stats } from "../../models/airline/stats.model";

@Injectable({ providedIn: 'root' })
export class AirlineService {

    constructor(private http: HttpClient, private authService: AuthService) { }

    getData() {
        const url = 'http://localhost:3000/api/airlines/getAirline';

        const token = this.authService.getToken();

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        return this.http.get(url, { headers: headers }).pipe(tap());
    }
       
    editData(name: string, code: string, mail:string, password: string) {
        const url = 'http://localhost:3000/api/airlines/updateAirline';
        const message = {
            name: name,
            code: code,
            mail: mail,
            password: password
        }

        const token = this.authService.getToken();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        this.http.post(url, message, { headers: headers }).subscribe({
            next: () => {
                alert('Dati aggiornati');
            },
            error: (error) => {
                console.error('UpdateUser error:', error);
                // Gestisci l'errore, magari mostrando un messaggio all'utente
            }
        });
    }

    activateAirline(email: string, temp: string, pw1: string, pw2: string) {
        const url = 'http://localhost:3000/api/airlines/activateAirline';
        const message = {
            email: email,
            temp: temp,
            pw1: pw1,
            pw2: pw2
        }

        this.http.post(url, message).subscribe({
            next: () => {
                alert('Airline attivata');
            },
            error: (error) => {
                console.error('activateAirline error:', error);
                // Gestisci l'errore, magari mostrando un messaggio all'utente
            }
        });
    }

    getStats() {
        const url = 'http://localhost:3000/api/airlines/getStatsRoute';
        const token = this.authService.getToken();

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        return this.http.get<Stats[]>(url, { headers: headers }).pipe(tap());
    }

}