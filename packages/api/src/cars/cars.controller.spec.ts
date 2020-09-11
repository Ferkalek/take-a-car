import { Test, TestingModule } from "@nestjs/testing";
import { CarsController } from "./cars.controller";
import { CarsService } from "./cars.service";
jest.mock("./cars.service.ts");

const cars = [
  {
    title: "Mersedec",
    description: "S500 gray color...",
    price: "123.23$",
    images: [],
    isBooked: true,
  },
  {
    title: "BMW",
    description: "5 white color...",
    price: "147.39$",
    images: [],
    isBooked: false,
  },
];

describe("Cars Controller", () => {
  let controller: CarsController;
  let carsService: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],

      providers: [CarsService],
    }).compile();

    controller = module.get<CarsController>(CarsController);
    carsService = module.get<CarsService>(CarsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("Test 1: should return an arey of cars", async () => {
      jest.spyOn(carsService, "findAll").mockResolvedValue(cars);
      const res = await controller.findAll();
      expect(res).toEqual(cars);
    });
  });

  describe("findOne", () => {
    it("Test 1: should return a car", async () => {
      jest.spyOn(carsService, "findOne").mockResolvedValue(cars[1]);
      const res = await controller.findOne("04356423567456");
      expect(res).toEqual(cars[1]);
    });
  });

  describe("create", () => {
    it("Test 1: should create a car", async () => {
      jest.spyOn(carsService, "create").mockResolvedValue(cars[0]);
      const res = await controller.create([], {});
      expect(res).toEqual(cars[0]);
    });
  });

  describe("update", () => {
    it("Test 1: should update a car", async () => {
      jest.spyOn(carsService, "update").mockResolvedValue(cars[0]);
      const res = await controller.update("04356423567456", [], {});
      expect(res).toEqual(cars[0]);
    });
  });

  describe("updateStatus", () => {
    it("Test 1: should update a status of a car", async () => {
      jest.spyOn(carsService, "update").mockResolvedValue(cars[0]);
      const res = await controller.updateStatus("04356423567456", {
        ...cars[0],
      });
      expect(res).toEqual(cars[0]);
    });
  });

  describe("delete", () => {
    it("Test 1: should delete a car", async () => {
      jest.spyOn(carsService, "delete").mockResolvedValue(cars[1]);
      const res = await controller.delete("04356423567456");
      expect(res).toEqual(cars[1]);
    });
  });
});
