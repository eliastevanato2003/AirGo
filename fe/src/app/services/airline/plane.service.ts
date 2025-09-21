import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getPlanes(filters: {
    id?: number;
    airline?: number;
    model?: number;
    constructionYear?: number;
    inservice?: boolean;
  } = {}): Observable<Plane[]> {
    let params = new HttpParams();

    if (filters.id != null) params = params.set('id', filters.id.toString());
    if (filters.airline != null) params = params.set('airline', filters.airline.toString());
    if (filters.model != null) params = params.set('model', filters.model.toString());
    if (filters.constructionYear != null) params = params.set('costructionyear', filters.constructionYear.toString());
    if (filters.inservice != null) params = params.set('inservice', filters.inservice.toString());

    return this.http.get<Plane[]>(`${this.baseUrl}/getPlanes`, { 
      headers: this.getHeaders(),
      params 
    }).pipe(
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

  changeService(id: number, inservice: boolean): Observable<any> {
    const body = { id, inservice };
    return this.http.post<any>(`${this.baseUrl}/changeService`, body, {headers:this.getHeaders()}).pipe(
      );
  }
}
