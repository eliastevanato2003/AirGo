import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, tap } from 'rxjs';
import { Model, NewModel } from '../../models/airline/model.model';

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

  getModels(id?: number, name?: string): Observable<Model[]> {
    const url = `${this.baseUrl}/getModels`;

    let params = new HttpParams();
    if (id !== undefined && id !== null) {
      params = params.set('id', id.toString());
    }
    if (name) {
      params = params.set('name', name);
    }

    return this.http.get<Model[]>(url, { headers: this.getHeaders(), params }).pipe(
      tap()
    );
  }

  

  addModel(newModel: NewModel): Observable<any> {
    const url = `${this.baseUrl}/newModel`;
    return this.http.post<any>(url, newModel, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }

  updateModel(
    id: number,
    data: {
      name?: string,
      seatspc?: number,
      rowsb?: number,
      columnsb?: number,
      rowse?: number,
      columnse?: number,
      extralegrows?: number[]
    }
  ): Observable<any> {
    const url = `${this.baseUrl}/updateModel`;
    const body = { id, ...data };

    return this.http.post<any>(url, body, {
      headers: this.getHeaders()
    }).pipe(
      tap()
    );
  }
  
}
