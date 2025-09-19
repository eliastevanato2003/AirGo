import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getModels(): Observable<Model[]> {
    const url = `${this.baseUrl}/getModels`;
    return this.http.get<Model[]>(url, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }

  addModel(newModel: NewModel): Observable<any> {
    const url = `${this.baseUrl}/newModel`;

    const body = {
      Name: newModel.Name,
      Seatspc: newModel.SeatsPC,
      rowsb: newModel.RowsB,
      columnsb: newModel.ColumnsB,
      rowse: newModel.RowsE,
      columnse: newModel.ColumnsE,
      extralegrows: newModel.ExtraLegRows
    };

    return this.http.post<any>(url, body, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }

  deleteModel(modelId: number): Observable<any> {
    const url = `${this.baseUrl}/deleteModel/${modelId}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() }).pipe(
      tap()
    );
  }
  
}
