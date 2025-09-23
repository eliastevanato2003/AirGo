import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth.service";
import { Airline, NewAirline } from "../../models/admin/airline.model";
import { Observable,tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AirlineService {

    private airlines: Airline[] = [];

    constructor(private http: HttpClient, private authService: AuthService) { }

    private getHeaders():HttpHeaders{
        const token = this.authService.getToken();

        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    getAirlines(filters:{id?:number, name?:string, code?:string, email?:string}={}):Observable<Airline[]> {
        const url = 'http://localhost:3000/api/airlines/getAirlines'

        let params = new HttpParams();

        if (filters.id != null) params = params.set('id', filters.id.toString());
        if (filters.name != null) params = params.set('name', filters.name.toString());
        if (filters.email != null) params = params.set('email', filters.email.toString());
        if (filters.code != null) params = params.set('identificationcode', filters.code.toString());


        return this.http.get<any[]>(url, { headers: this.getHeaders(), params }).pipe(
            tap()
        );
    }

    addAirline(airline: NewAirline):Observable<any>{
        const url = 'http://localhost:3000/api/airlines/newAirline'

        const message = {
            name: airline.name,
            identificationcode: airline.code,
            email: airline.email,
        };

        return this.http.post(url, message, { headers: this.getHeaders() }).pipe(tap());
    }

    deleteAirline(id: number):Observable<any>{
        const url = 'http://localhost:3000/api/airlines/deleteAirline'

        return this.http.request<any>('delete', url, {
              body: {id:id},
              headers: this.getHeaders()
            });
        
    }
}