import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AdminComponent } from "./admin.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { cars } from "src/mock/cars";
import { UtilsService } from "../shared/services/utils.service";

describe("AdminComponent", () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let utilsService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("createMode", () => {
    it("Test 1: a car input should equal null when the method run", () => {
      component.createMode();
      expect(component.inpCar).toEqual(null);
    });
  });

  describe("getCarForEdit", () => {
    it("Test 1: a car input should equal car that we pass as an argument when the method run", () => {
      component.getCarForEdit(cars[0]);
      expect(component.inpCar).toEqual(cars[0]);
    });
  });

  describe("leaving", () => {
    beforeEach(() => {
      utilsService = TestBed.get(UtilsService);
    });
    it("Test 1: should run removeClassNoscroll method from utilsService when the method run", () => {
      const spy = spyOn(utilsService, "removeClassNoscroll").and.callThrough();
      component.leaving();
      expect(spy).toHaveBeenCalled();
    });
  });
});
