import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ICarDTO } from "../shared/interfaces/car.interface";

@Injectable({
  providedIn: "root",
})
export class AdminRequestService {
  constructor(private http: HttpClient) {}

  public getFileRequest(filePath: string): Observable<ICarDTO> {
    return this.http
      .get<ICarDTO>(`http://localhost:3000/file-worker/${filePath}`)
      .pipe(catchError(this.handleError));
  }

  public addCarRequest(car: FormData): Observable<ICarDTO> {
    return this.http
      .post<ICarDTO>("http://localhost:3000/cars/create", car)
      .pipe(catchError(this.handleError));
  }

  public deleteCarRequest(id: string): Observable<ICarDTO> {
    return this.http
      .delete<ICarDTO>(`http://localhost:3000/cars/${id}`)
      .pipe(catchError(this.handleError));
  }

  public updateCarStatusRequest(id: string, car: ICarDTO): Observable<ICarDTO> {
    return this.http
      .put<ICarDTO>(`http://localhost:3000/cars/update-status/${id}`, car)
      .pipe(catchError(this.handleError));
  }

  public updateCarRequest(id: string, car: FormData): Observable<ICarDTO> {
    console.log("-- 2 updateCarRequest", car);
    return this.http
      .put<ICarDTO>(`http://localhost:3000/cars/edit/${id}`, car)
      .pipe(catchError(this.handleError));
  }

  private handleError = (error: any) => {
    return throwError(error);
  };
}
