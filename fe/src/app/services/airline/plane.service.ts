import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, tap } from 'rxjs';
import { NewPlane, Plane} from '../../models/airline/plane.model';

@Injectable({ providedIn: 'root' })
export class PlaneService {
  private baseUrl = 'http://localhost:3000/api/planes';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log(token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getPlanes(): Observable<Plane[]> {
    const url = `${this.baseUrl}/getPlanes`;
    return this.http.get<Plane[]>(url, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }

  getPlanesByAirline(airlineId: number): Observable<Plane[]> {
    const url = `${this.baseUrl}/getPlanes?airline=${airlineId}`;
    return this.http.get<Plane[]>(url, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }

  addPlane(newPlane: NewPlane): Observable<any> {
    const url = `${this.baseUrl}/newPlane`;

    const body = {
      model: newPlane.model,
      constructionyear: newPlane.constructionyear
    };

    return this.http.post<any>(url, body, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }

  deletePlane(idPlane: number): Observable<any> {
  const url = `${this.baseUrl}/deletePlane`;

  return this.http.request<any>('delete', url, {
    body: { id: idPlane },
    headers: this.getHeaders()
  });
}
}
