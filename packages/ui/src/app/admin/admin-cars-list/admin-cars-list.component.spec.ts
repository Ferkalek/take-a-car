import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminCarsListComponent } from "./admin-cars-list.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NgxsModule } from "@ngxs/store";
import { CarsState } from "src/app/state/cars.state";
import { cars } from "src/mock/cars";
import { AdminService } from "../admin.service";
import { of } from "rxjs";
import { LoaderService } from "src/app/loader/loader.service";
import { UtilsService } from "src/app/shared/services/utils.service";
import { PROCESSING } from "../admin.constants";

describe("AdminCarsListComponent", () => {
  let component: AdminCarsListComponent;
  let fixture: ComponentFixture<AdminCarsListComponent>;
  let adminService: AdminService;
  let utilsService: UtilsService;
  let loaderService: LoaderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCarsListComponent],
      imports: [HttpClientTestingModule, NgxsModule.forRoot([CarsState])],
    }).compileComponents();
  }));

  beforeEach(() => {
    adminService = TestBed.get(AdminService);
    utilsService = TestBed.get(UtilsService);
    loaderService = TestBed.get(LoaderService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    adminService = null;
    utilsService = null;
    loaderService = null;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onBooked", () => {
    it("Test 1: should change status", () => {
      let res = null;
      spyOn(adminService, "updateCarStatus").and.callFake(() => {
        res = of(cars[1]);
        return res;
      });
      const spyLoaderService = spyOn(
        loaderService,
        "setPprocessing"
      ).and.callThrough();
      const spyUtilsService = spyOn(
        utilsService,
        "removeClassNoscroll"
      ).and.callThrough();

      component.onBooked(cars[1]);
      res.subscribe(() => {
        expect(spyLoaderService).toHaveBeenCalledWith(
          PROCESSING.CHANGING_STATUS
        );
        expect(spyUtilsService).toHaveBeenCalled();
      });
    });
  });

  describe("edit", () => {
    it("Test 1: should emit editMode", () => {
      const editMode = spyOn(component.editMode, "emit").and.callThrough();
      component.edit(cars[0]);
      expect(editMode).toHaveBeenCalledWith(cars[0]);
    });
  });

  describe("delete", () => {
    it("Test 1: should delete a car", () => {
      let res = null;
      spyOn(adminService, "deleteCars").and.callFake(() => {
        res = of(cars[1]);
        return res;
      });
      const spyLoaderService = spyOn(
        loaderService,
        "setPprocessing"
      ).and.callThrough();
      const spyUtilsService = spyOn(
        utilsService,
        "removeClassNoscroll"
      ).and.callThrough();

      component.delete(cars[1]._id);
      res.subscribe(() => {
        expect(spyLoaderService).toHaveBeenCalledWith(PROCESSING.DELETING);
        expect(spyUtilsService).toHaveBeenCalled();
      });
    });
  });
});
