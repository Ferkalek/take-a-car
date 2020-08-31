import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { AdminRequestService } from "./admin-request.service";
import { ICarDTO } from "../shared/interfaces/car.interface";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  public message$ = new BehaviorSubject<string>("");

  private message: string = "";

  constructor(private adminRequestService: AdminRequestService) {}

  public getMessage(): string {
    return this.message;
  }

  public setMessage(status: string): void {
    this.message = status;
  }

  public getFile(filePath: string): Observable<ICarDTO> {
    return this.adminRequestService.getFileRequest(filePath);
  }

  public addCars(car: FormData): Observable<ICarDTO> {
    return this.adminRequestService.addCarRequest(car);
  }

  public deleteCars(id: string): Observable<ICarDTO> {
    return this.adminRequestService.deleteCarRequest(id);
  }

  public updateCarStatus(id: string, car: ICarDTO): Observable<ICarDTO> {
    return this.adminRequestService.updateCarStatusRequest(id, car);
  }

  public updateCar(id: string, car: FormData): Observable<ICarDTO> {
    return this.adminRequestService.updateCarRequest(id, car);
  }
}
