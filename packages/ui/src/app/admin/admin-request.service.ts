import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ICarDTO } from "../shared/interfaces/car.interface";
import { API_PATH } from "../shared/api.const";

@Injectable({
  providedIn: "root",
})
export class AdminRequestService {
  constructor(private http: HttpClient) {}

  public addCarRequest(car: FormData): Observable<ICarDTO> {
    return this.http
      .post<ICarDTO>(API_PATH.CREATE, car)
      .pipe(catchError(this.handleError));
  }

  public deleteCarRequest(id: string): Observable<ICarDTO> {
    return this.http
      .delete<ICarDTO>(`${API_PATH.CARS}/${id}`)
      .pipe(catchError(this.handleError));
  }

  public updateCarStatusRequest(id: string, car: ICarDTO): Observable<ICarDTO> {
    return this.http
      .put<ICarDTO>(`${API_PATH.UPDATE_STATUS}/${id}`, car)
      .pipe(catchError(this.handleError));
  }

  public updateCarRequest(id: string, car: FormData): Observable<ICarDTO> {
    return this.http
      .put<ICarDTO>(`${API_PATH.EDIT}/${id}`, car)
      .pipe(catchError(this.handleError));
  }

  private handleError = (error: any) => {
    return throwError(error);
  };
}
