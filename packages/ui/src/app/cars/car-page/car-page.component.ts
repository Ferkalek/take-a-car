import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { CarsListService } from "src/app/shared/services/cars-list.service";
import {
  ICarDTO,
  IDataFromCar,
  IRentCarDTO,
} from "src/app/shared/interfaces/car.interface";
import { LoaderService } from "src/app/loader/loader.service";
import { UtilsService } from "src/app/shared/services/utils.service";
import {
  FormBuilder,
  FormControl,
  FormControlName,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";

@Component({
  selector: "tcar-car-page",
  templateUrl: "./car-page.component.html",
  styleUrls: ["./car-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarPageComponent implements OnInit, OnDestroy {
  public isLoading = new BehaviorSubject(true);
  public car$ = new BehaviorSubject<ICarDTO>(null);
  public feedbackForm: FormGroup = this.formBuilder.group({
    userName: ["", Validators.required],
    userContact: ["", Validators.required],
  });

  @ViewChild("form", { static: false }) form: NgForm;
  private subscriptions: Subscription[] = [];
  private carId = "";

  constructor(
    private route: ActivatedRoute,
    private carsListService: CarsListService,
    private loaderService: LoaderService,
    private utilsService: UtilsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loaderService.setPprocessing("Loading...");
    this.utilsService.addClassNoscroll();

    this.carId = this.route.snapshot.params.id;

    this.subscriptions.push(
      this.carsListService.getOneCar(this.carId).subscribe((car) => {
        this.car$.next(car);
        this.loaderService.setPprocessing("");
        this.utilsService.removeClassNoscroll();
      })
    );
  }

  public onSubmit(data: IDataFromCar) {
    if (this.feedbackForm.invalid) {
      return;
    }

    const { userName, userContact } = this.feedbackForm.value;
    const rentCar = {
      ...data,
      userName,
      userContact,
    };

    this.carsListService
      .sendEmail(rentCar)
      .subscribe((d) => console.log("-- 1 -- sendEmail END", d));
  }

  public getField(field: string) {
    return this.feedbackForm.get(field);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
