import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModelService {
  private baseUrl = 'http://localhost:3000/api/models';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getModels(): Observable<any[]> {
    const url = `${this.baseUrl}/getModels`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }

  addModel(
    name: string,
    seatspc: number,
    rowsb: number,
    columnsb: number,
    rowse: number,
    columnse: number,
    extralegrows: number[]
  ): Observable<any> {
    const url = `${this.baseUrl}/newModel`;

    const body = {
      name,
      seatspc,
      rowsb,
      columnsb,
      rowse,
      columnse,
      extralegrows
    };

    return this.http.post<any>(url, body, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }
}
