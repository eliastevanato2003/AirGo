import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, tap } from 'rxjs';
import { Model, NewModel } from '../../models/admin/model.model';

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

  getModels(): Observable<Model[]> {
    const url = `${this.baseUrl}/getModels`;
    return this.http.get<Model[]>(url, { headers: this.getHeaders() }).pipe(
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

  deleteModel(modelId: number): Observable<any> {
    const url = `${this.baseUrl}/deleteModel`;
    return this.http.request<any>('delete', url, {
      body: { id: modelId },
      headers: this.getHeaders() 
      }
    );
  }
  
}
