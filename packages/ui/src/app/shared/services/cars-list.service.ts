import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarsListRequestService } from './cars-list-request.service';

@Injectable({
    providedIn: 'root'
})
export class CarsListService {
    constructor(
        private carsListRequestService: CarsListRequestService
    ) {}

    getCars(): Observable<any> {
        return this.carsListRequestService.getCarsRequest();
    }

    getOneCar(id: string): Observable<any> {
        return this.carsListRequestService.getOneCarRequest(id);
    }
}
