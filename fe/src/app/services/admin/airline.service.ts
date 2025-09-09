import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AirlineService {
    constructor(private http: HttpClient) {}

    getAirlines() {
        
    }

    addAirline() {}

    updateAirline() {}

    deleteAirline(id: number) {}
}