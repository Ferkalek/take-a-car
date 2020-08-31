import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CarsListRequestService {
    constructor(
        private http: HttpClient
    ) {}

    getCarsRequest(): Observable<any> {
        return this.http.get<any>('http://localhost:3000/cars');
    }

    getOneCarRequest(id: string): Observable<any> {
        return this.http.get<any>(`http://localhost:3000/cars/${id}`);
    }
}
