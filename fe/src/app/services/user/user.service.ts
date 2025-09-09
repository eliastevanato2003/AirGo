import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { User } from "../../models/user/user.model";

@Injectable({ providedIn: 'root' })
export class UserService {

    private url = 'http://localhost:3000/api/users/updateUser';

    constructor(private http: HttpClient, private authService: AuthService) { }

    getData(): User | null {
        const url = 'http://localhost:3000/api/users/getUser';

        const token = this.authService.getToken();

        // Crea l'intestazione di autorizzazione
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        // Richiesta dei dati
        this.http.get(url, { headers: headers }).subscribe({
            next: (response) => {
                const data = response as User;
                return data;
            },
            error: (error) => {
                console.error('GetUser error:', error);
                // Gestisci l'errore, magari mostrando un messaggio all'utente
            }
        });
        return null;
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
        this.http.post(this.url, message, { headers: headers }).subscribe({
            next: () => {
                alert('Dati aggiornati');
            },
            error: (error) => {
                console.error('UpdateUser error:', error);
                // Gestisci l'errore, magari mostrando un messaggio all'utente
            }
        });
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
        this.http.post(this.url, message, { headers: headers }).subscribe({
            next: () => {
                alert('Dati aggiornati');
            },
            error: (error) => {
                console.error('UpdateUser error:', error);
                // Gestisci l'errore, magari mostrando un messaggio all'utente
            }
        });
    }
}