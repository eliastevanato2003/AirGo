import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, tap } from 'rxjs';
import { Airport, NewAirport } from '../../models/admin/airport.model';

@Injectable({ providedIn: 'root' })
export class AirportService {
  private baseUrl = 'http://localhost:3000/api/airports';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAirports(filters:{id?:number,city?:string,country?:string,code?:string}={}):Observable<Airport[]>{

    let params = new HttpParams();

    if (filters.id != null) params = params.set('id', filters.id.toString());
    if (filters.city != null) params = params.set('city', filters.city.toString());
    if (filters.country != null) params = params.set('country', filters.country.toString());
    if (filters.code != null) params = params.set('identificationcode', filters.code.toString());

    return this.http.get<Airport[]>(`${this.baseUrl}/getAirports`, { 
      headers: this.getHeaders(),
      params 
    }).pipe(
      tap()
    );
  }

  newAirport(newairport: NewAirport): Observable<any>{
    const url= `${this.baseUrl}/newAirport`;
    return this.http.post<any>(url, newairport, {headers:this.getHeaders()}).pipe(tap());
  }

  deleteAirport(airportid: number): Observable<any[]>{
    const url = `${this.baseUrl}/deleteAirport`;
    return this.http.request<any[]>('delete', url, {
      body: {id:airportid},
      headers: this.getHeaders()
    });
  }

  updateAirport(
        id: number,
        data: {
        city?: string,
        country?: string,
        name?: string,
        identificationcode?: string
        }
    ): Observable<any> {
        const url = `${this.baseUrl}/updateAirport`;
        const body = { id, ...data };

        return this.http.post<any>(url, body, { headers: this.getHeaders() });
    }

}