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
import { AdminService } from "src/app/admin/admin.service";

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
  public isFeedbackForm = false;
  @ViewChild("form", { static: false }) form: NgForm;
  private subscriptions: Subscription[] = [];
  private carId = "";

  constructor(
    private route: ActivatedRoute,
    private carsListService: CarsListService,
    private loaderService: LoaderService,
    private utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private adminService: AdminService
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

    this.loaderService.setPprocessing("Sending request...");

    const { userName, userContact } = this.feedbackForm.value;
    const rentCar = {
      ...data,
      userName,
      userContact,
    };

    this.carsListService.sendEmail(rentCar).subscribe((d) => {
      this.loaderService.setPprocessing("");
      this.feedbackForm.reset();
      this.toggleFeedbackForm();
      this.adminService.message$.next(
        "Your request sent. We contact you ASAP!"
      );
      setTimeout(() => {
        this.adminService.message$.next("");
      }, 2000);
    });
  }

  public getField(field: string) {
    return this.feedbackForm.get(field);
  }

  toggleFeedbackForm() {
    if (this.isFeedbackForm) {
      this.utilsService.removeClassNoscroll();
    } else {
      this.utilsService.addClassNoscroll();
    }
    this.isFeedbackForm = !this.isFeedbackForm;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
