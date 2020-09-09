import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AdminService } from "./admin.service";
import { AdminRequestService } from "./admin-request.service";
import { cars } from "src/mock/cars";

describe("ValueService", () => {
  let service: AdminService;
  let adminRequestService: AdminRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminService, AdminRequestService],
      imports: [HttpClientTestingModule],
    });
  });

  beforeEach(() => {
    service = TestBed.get(AdminService);
    adminRequestService = TestBed.get(AdminRequestService);
  });

  afterEach(() => {
    service = null;
    adminRequestService = null;
  });

  it("should create", () => {
    expect(service).toBeTruthy();
  });

  describe("addCars", () => {
    it("Test 1: should add new car", () => {
      const spy = spyOn(adminRequestService, "addCarRequest").and.callThrough();
      const car = new FormData();
      service.addCars(car);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("deleteCars", () => {
    it("Test 1: should delete a car", () => {
      const spy = spyOn(
        adminRequestService,
        "deleteCarRequest"
      ).and.callThrough();
      service.deleteCars(cars[0]._id);
      expect(spy).toHaveBeenCalledWith(cars[0]._id);
    });
  });

  describe("updateCarStatus", () => {
    it("Test 1: should update status a car", () => {
      const spy = spyOn(
        adminRequestService,
        "updateCarStatusRequest"
      ).and.callThrough();
      service.updateCarStatus(cars[0]._id, cars[0]);
      expect(spy).toHaveBeenCalledWith(cars[0]._id, cars[0]);
    });
  });

  describe("updateCar", () => {
    it("Test 1: should update a car", () => {
      const spy = spyOn(
        adminRequestService,
        "updateCarRequest"
      ).and.callThrough();
      const car = new FormData();
      service.updateCar(cars[0]._id, car);
      expect(spy).toHaveBeenCalledWith(cars[0]._id, car);
    });
  });
});
