import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { CarsListComponent } from "./cars-list.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NgxsModule } from "@ngxs/store";
import { CarsState } from "src/app/state/cars.state";
import {
  BOOKED_STYLED_CLASSES,
  UNBOOKED_STYLED_CLASSES,
} from "./cars-list.consts";
import { CarsListService } from "src/app/shared/services/cars-list.service";
import { cars } from "src/mock/cars";
import { LoaderService } from "src/app/loader/loader.service";
import { UtilsService } from "src/app/shared/services/utils.service";
import { of } from "rxjs/internal/observable/of";

describe("CarsListComponent", () => {
  let component: CarsListComponent;
  let fixture: ComponentFixture<CarsListComponent>;
  let carsListService: CarsListService;
  let loaderService: LoaderService;
  let utilsService: UtilsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarsListComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([CarsState]),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    beforeEach(() => {
      carsListService = TestBed.get(CarsListService);
      loaderService = TestBed.get(LoaderService);
      utilsService = TestBed.get(UtilsService);
    });
    it("Test 1: should be call methods from different services when the method run", () => {
      const spyCarsListService = spyOn(
        carsListService,
        "getCars"
      ).and.returnValue(of(cars));

      const spyLoaderService = spyOn(
        loaderService,
        "setPprocessing"
      ).and.callThrough();
      const spyUtilsService = spyOn(
        utilsService,
        "removeClassNoscroll"
      ).and.callThrough();

      component.ngOnInit();

      expect(spyCarsListService).toHaveBeenCalled();
      expect(spyLoaderService).toHaveBeenCalledWith("");
      expect(spyUtilsService).toHaveBeenCalled();
    });
  });

  describe("classesForStatus", () => {
    it("Test 1: should return booked styled classes if isBooked true", () => {
      const styledClasses = component.classesForStatus(true);
      expect(styledClasses).toEqual(BOOKED_STYLED_CLASSES);
    });
    it("Test 2: should return unbooked styled classes if isBooked false", () => {
      const styledClasses = component.classesForStatus(false);
      expect(styledClasses).toEqual(UNBOOKED_STYLED_CLASSES);
    });
  });
});
