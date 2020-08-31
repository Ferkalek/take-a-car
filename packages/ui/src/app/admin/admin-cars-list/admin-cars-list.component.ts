import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { CarsState } from "src/app/state/cars.state";
import { ICarDTO } from "src/app/shared/interfaces/car.interface";
import { AdminService } from "../admin.service";
import {
  DeleteCarAction,
  UpdateStatusOfCarAction,
  AddCarsAction,
} from "src/app/actions/car.action";
import { CarsListService } from "src/app/shared/services/cars-list.service";
import { take } from "rxjs/operators";
import { UtilsService } from "src/app/shared/services/utils.service";
import { LoaderService } from "src/app/loader/loader.service";

@Component({
  selector: "tcar-admin-cars-list",
  templateUrl: "./admin-cars-list.component.html",
  styleUrls: ["./admin-cars-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCarsListComponent implements OnInit, OnDestroy {
  @Output()
  public editMode = new EventEmitter();

  @Select(CarsState.cars)
  public readonly cars$: Observable<ICarDTO[]>;

  public isEditMode = new BehaviorSubject<boolean>(false);

  private subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private carsListService: CarsListService,
    private store: Store,
    private loaderService: LoaderService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.loaderService.setPprocessing("Loading...");
    this.utilsService.addClassNoscroll();

    this.subscriptions.push(
      this.cars$.pipe(take(1)).subscribe((cars) => {
        if (cars.length === 0) {
          this.carsListService.getCars().subscribe((cars) => {
            this.store.dispatch(new AddCarsAction(cars));

            this.loaderService.setPprocessing("");
            this.utilsService.removeClassNoscroll();
          });
        } else {
          this.loaderService.setPprocessing("");
          this.utilsService.removeClassNoscroll();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public onBooked(car: ICarDTO): void {
    const { _id, isBooked } = car;
    this.loaderService.setPprocessing("Changing status...");
    this.utilsService.addClassNoscroll();

    this.adminService
      .updateCarStatus(_id, { isBooked: !isBooked } as ICarDTO)
      .subscribe((res) => {
        this.store.dispatch(new UpdateStatusOfCarAction(_id, !isBooked));

        this.loaderService.setPprocessing("");
        this.utilsService.removeClassNoscroll();

        this.showStatus("The state of the car was successfully changed!");
      });
  }

  public edit(car: ICarDTO): void {
    this.editMode.emit(car);
  }

  public delete(_id: string): void {
    this.loaderService.setPprocessing("Deleting...");
    this.utilsService.addClassNoscroll();

    this.adminService.deleteCars(_id).subscribe((res) => {
      this.store.dispatch(new DeleteCarAction(_id));

      this.loaderService.setPprocessing("");
      this.utilsService.removeClassNoscroll();

      this.showStatus("The car was successfully deleted!");
    });
  }

  private showStatus(msg: string): void {
    this.adminService.message$.next(msg);
    setTimeout(() => {
      this.adminService.message$.next("");
    }, 1500);
  }
}
