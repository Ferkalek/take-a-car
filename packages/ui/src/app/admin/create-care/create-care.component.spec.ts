import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateCareComponent } from "./create-care.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NgxsModule } from "@ngxs/store";
import { CarsState } from "src/app/state/cars.state";
import { cars } from "src/mock/cars";
import { UtilsService } from "src/app/shared/services/utils.service";
import { LoaderService } from "src/app/loader/loader.service";
import { PROCESSING } from "../admin.constants";
import { AdminService } from "../admin.service";
import { of } from "rxjs";

describe("CreateCareComponent", () => {
  let component: CreateCareComponent;
  let fixture: ComponentFixture<CreateCareComponent>;
  let utilsService: UtilsService;
  let loaderService: LoaderService;
  let adminService: AdminService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCareComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([CarsState]),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("Test 1: should be call methods from different services when the method run", () => {
      component.inpCar = { ...cars[0] };
      component.ngOnInit();
      expect(component.carForm.value["title"]).toEqual("Mercedes");
    });
  });

  describe("onSubmit", () => {
    beforeEach(() => {
      utilsService = TestBed.get(UtilsService);
      loaderService = TestBed.get(LoaderService);
      adminService = TestBed.get(AdminService);
    });

    it("Test 1: should be stop running the method if the form is empty", () => {
      const spyUtilsService = spyOn(
        utilsService,
        "addClassNoscroll"
      ).and.callThrough();
      component.ngOnInit();
      component.onSubmit();
      expect(spyUtilsService).not.toHaveBeenCalledWith();
    });

    it("Test 2: should be run creating mode when the input car is null", () => {
      spyOn(adminService, "addCars").and.returnValue(of(cars[1]));
      const spyLoaderService = spyOn(
        loaderService,
        "setPprocessing"
      ).and.callThrough();
      const spyUtilsService = spyOn(
        utilsService,
        "removeClassNoscroll"
      ).and.callThrough();

      component.ngOnInit();

      const { title, description, price } = cars[0];
      component.carForm.patchValue({
        title,
        description,
        price,
        images: ["C:/user/audi.jpg"],
      });

      component.onSubmit();
      expect(spyLoaderService).toHaveBeenCalledWith(PROCESSING.CREATING);
      expect(spyLoaderService).toHaveBeenCalledWith("");
      expect(spyUtilsService).toHaveBeenCalled();
    });

    it("Test 3: should be run editing mode when the input car is not null", () => {
      spyOn(adminService, "updateCar").and.returnValue(of(cars[1]));
      const spyLoaderService = spyOn(
        loaderService,
        "setPprocessing"
      ).and.callThrough();
      component.inpCar = { ...cars[0] };
      component.ngOnInit();
      component.onSubmit();
      expect(spyLoaderService).toHaveBeenCalledWith(PROCESSING.EDITING);
    });
  });

  describe("getFileName", () => {
    it("Test 1: should ged name of file with extation when the method run", () => {
      component.ngOnInit();
      component.carForm.patchValue({
        images: ["C:/user/audi.png"],
      });
      const fileName = component.getFileName(0);
      expect(fileName).toEqual("audi.png");
    });
  });

  describe("deleteFile", () => {
    it("Test 1: should be one empty field for images", () => {
      component.ngOnInit();
      component.carForm.patchValue({
        images: ["C:/user/audi.png"],
      });
      component.deleteFile(0);
      expect(component.carForm.value["images"].length).toEqual(1);
    });
  });

  describe("formReset", () => {
    it("Test 1: should be one empty field for images", () => {
      component.formReset();
      expect(component.carForm.value["images"].length).toEqual(1);
    });
  });

  describe("closeForm", () => {
    it("Test 1: should be emit leaving", () => {
      const spyleaving = spyOn(component.leaving, "emit").and.callThrough();
      component.closeForm();
      expect(spyleaving).toHaveBeenCalled();
    });
  });
});
