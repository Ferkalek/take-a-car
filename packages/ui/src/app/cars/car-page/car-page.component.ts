import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { CarsListService } from "src/app/shared/services/cars-list.service";
import { ICarDTO } from "src/app/shared/interfaces/car.interface";
import { LoaderService } from "src/app/loader/loader.service";
import { UtilsService } from "src/app/shared/services/utils.service";

@Component({
  selector: "tcar-car-page",
  templateUrl: "./car-page.component.html",
  styleUrls: ["./car-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarPageComponent implements OnInit, OnDestroy {
  public isLoading = new BehaviorSubject(true);
  public car$ = new BehaviorSubject<ICarDTO>(null);
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private carsListService: CarsListService,
    private loaderService: LoaderService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.loaderService.setPprocessing("Loading...");
    this.utilsService.addClassNoscroll();

    const carId = this.route.snapshot.params.id;

    this.subscriptions.push(
      this.carsListService.getOneCar(carId).subscribe((car) => {
        this.car$.next(car);
        this.loaderService.setPprocessing("");
        this.utilsService.removeClassNoscroll();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
