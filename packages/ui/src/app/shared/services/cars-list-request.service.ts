import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { API_PATH } from "../api.const";
import { ICarDTO, IRentCarDTO } from "../interfaces/car.interface";

@Injectable({
  providedIn: "root",
})
export class CarsListRequestService {
  constructor(private http: HttpClient) {}

  public getCarsRequest(): Observable<ICarDTO[]> {
    return this.http
      .get<ICarDTO[]>(API_PATH.CARS)
      .pipe(catchError(this.handleError));
  }

  public getOneCarRequest(id: string): Observable<ICarDTO> {
    return this.http
      .get<ICarDTO>(`${API_PATH.CARS}/${id}`)
      .pipe(catchError(this.handleError));
  }

  public sendEmailRequest(rentCar: IRentCarDTO): Observable<any> {
    return this.http
      .post<IRentCarDTO>(`${API_PATH.SEND_EMAIL}`, rentCar)
      .pipe(catchError(this.handleError));
  }

  private handleError = (error: any) => {
    return throwError(error);
  };
}
