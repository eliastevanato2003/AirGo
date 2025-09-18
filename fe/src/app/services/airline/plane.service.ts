import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlaneService {
  private baseUrl = 'http://localhost:3000/api/planes';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getPlanes(): Observable<any[]> {
    const url = `${this.baseUrl}/getPlanes`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }

  getPlanesByAirline(airlineId: number): Observable<any[]> {
    const url = `${this.baseUrl}/getPlanes?airline=${airlineId}`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }

  addPlane(model: number, constructionYear: number): Observable<any> {
    const url = `${this.baseUrl}/newPlane`;

    const body = {
      model: model,
      constructionyear: constructionYear
    };

    return this.http.post<any>(url, body, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }
}
