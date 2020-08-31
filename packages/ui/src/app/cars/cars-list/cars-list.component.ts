import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from "@angular/core";
import { CarsListService } from "../../shared/services/cars-list.service";
import { Observable, Subscription } from "rxjs";
import { Store, Select } from "@ngxs/store";
import { CarsState } from "src/app/state/cars.state";
import { ICarDTO } from "src/app/shared/interfaces/car.interface";
import { AddCarsAction } from "src/app/actions/car.action";
import { LoaderService } from "src/app/loader/loader.service";
import { UtilsService } from "src/app/shared/services/utils.service";

@Component({
  selector: "tcar-cars-list",
  templateUrl: "./cars-list.component.html",
  styleUrls: ["./cars-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarsListComponent implements OnInit, OnDestroy {
  @Select(CarsState.cars) readonly cars$: Observable<ICarDTO[]>;
  private subscriptions: Subscription[] = [];

  constructor(
    private carsListService: CarsListService,
    private store: Store,
    private loaderService: LoaderService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.loaderService.setPprocessing("Loading...");
    this.utilsService.addClassNoscroll();

    this.subscriptions.push(
      this.cars$.subscribe((cars) => {
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

  public classesForStatus(isBooked: boolean): string {
    if (isBooked) {
      return "bg-gray-500 border-gray-600";
    } else {
      return "bg-teal-200 border-teal-300 text-teal-700";
    }
  }
}
