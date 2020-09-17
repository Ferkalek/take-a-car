import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_PATH } from "../api.const";

@Injectable({
  providedIn: "root",
})
export class CarsListRequestService {
  constructor(private http: HttpClient) {}

  getCarsRequest(): Observable<any> {
    return this.http.get<any>(API_PATH.CARS);
  }

  getOneCarRequest(id: string): Observable<any> {
    return this.http.get<any>(`${API_PATH.CARS}/${id}`);
  }

  sendEmailRequest(id: string): Observable<any> {
    console.log("-- 3 -- sendEmail", id);
    return this.http.get<any>(`${API_PATH.SEND_EMAIL}/${id}`);
  }
}
