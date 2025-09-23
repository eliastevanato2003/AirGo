import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {

    private url = 'http://localhost:3000/api/users/updateUser';

    constructor(private http: HttpClient, private authService: AuthService) { }

    getData() {
        const url = 'http://localhost:3000/api/users/getUser';

        const token = this.authService.getToken();

        // Crea l'intestazione di autorizzazione
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        // Richiesta dei dati
        return this.http.get(url, { headers: headers }).pipe(tap());
    }

    editPersonal(name: string, surname: string, password: string) {
        const message = {
            name: name,
            surname: surname,
            password: password
        }

        const token = this.authService.getToken();

        // Crea l'intestazione di autorizzazione
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        // Richiesta dei dati
        return this.http.post(this.url, message, { headers: headers });
    }

    editContact(email: string, number: string) {
        const message = {
            email: email,
            number: number
        }

        const token = this.authService.getToken();

        // Crea l'intestazione di autorizzazione
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        // Richiesta dei dati
        return this.http.post(this.url, message, { headers: headers });
    }

    deleteAccount() {
        const url = 'http://localhost:3000/api/users/deleteUser';

        const token = this.authService.getToken();

        // Crea l'intestazione di autorizzazione
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        const message = {
            id: this.authService.getId()
        };

        // Richiesta dei dati
        return this.http.delete(url, { headers: headers, body: message }).pipe(tap());
    }
}