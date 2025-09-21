import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { FlightStatus } from "../../models/user/flight.model";
import { Model } from "../../models/airline/model.model";

@Injectable({ providedIn: 'root' })
export class FlightService {
  constructor(private http: HttpClient) { }

  getFlights(from: number, to: number, minDepartureDate: string, maxDepartureDate: string) {
    const url = 'http://localhost:3000/api/flights/getFlights';
    let message;

    // Filtri della get
    if(from === 0 && to === 0) {
      message = {
        datedeparture: minDepartureDate,
        datearrival: maxDepartureDate
      };
    } else if(from === 0) {
      message = {
        arrival: to,
        datedeparture: minDepartureDate,
        datearrival: maxDepartureDate
      };
    } else if(to === 0) {
      message = {
        departure: from,
        datedeparture: minDepartureDate,
        datearrival: maxDepartureDate
      };
    } else {
      message = {
      departure: from,
      arrival: to,
      datedeparture: minDepartureDate,
      datearrival: maxDepartureDate
    };
  }

    // Richiesta dei dati
    return this.http.get(url, { params: message }).pipe(tap());
  }

  getFlightStatus(id: number) {
    const url = 'http://localhost:3000/api/flights/getFlightStatus';

    // Filtri della get
    const options = {
      params: { id: id.toString() }
    };

    // Richiesta dei dati
    return this.http.get<FlightStatus[]>(url, options).pipe(tap());
  }

  getExtraLegRoom(idModel: number) {
    const url = 'http://localhost:3000/api/models/getModels';

    // Filtri della get
    const message = { id: idModel.toString() };

    // Richiesta dei dati
    return this.http.get<Model[]>(url, { params: message }).pipe(tap());
  }
}