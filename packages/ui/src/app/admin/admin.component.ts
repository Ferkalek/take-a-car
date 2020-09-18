import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ICarDTO } from "../shared/interfaces/car.interface";
import { UtilsService } from "../shared/services/utils.service";

@Component({
  selector: "tcar-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  public inpCar;
  private _showForm = false;

  get showForm() {
    return this._showForm;
  }

  constructor(private utilsService: UtilsService) {}

  public createMode(): void {
    this._showForm = true;
    this.inpCar = null;

    this.utilsService.addClassNoscroll();
  }

  public getCarForEdit(car: ICarDTO): void {
    this._showForm = true;
    this.inpCar = car;

    this.utilsService.addClassNoscroll();
  }

  public leaving(): void {
    this._showForm = false;

    this.utilsService.removeClassNoscroll();
  }
}
