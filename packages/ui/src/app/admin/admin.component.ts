import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Inject,
} from "@angular/core";
import { ICarDTO } from "../shared/interfaces/car.interface";
import { DOCUMENT } from "@angular/common";
import { UtilsService } from "../shared/services/utils.service";
import { AdminService } from "./admin.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "tcar-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  public inpCar;
  private _showForm = false;

  public message$ = new BehaviorSubject<string>("");

  get showForm() {
    return this._showForm;
  }

  get message(): string {
    // const m = this.adminService.getMessage();
    const m = this.adminService.message$.getValue();
    console.log("----- message", m);
    return m;
  }

  constructor(
    private utilsService: UtilsService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.adminService.message$.subscribe((m) => this.message$.next(m));
  }

  public closeAlert(): void {
    this.adminService.message$.next("");
  }

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