import { Test, TestingModule } from "@nestjs/testing";
import { CarsService } from "./cars.service";
import { getModelToken } from "@nestjs/mongoose";

const car = {
  _id: "456e3254",
  title: "Mersedec",
  description: "S500 gray color...",
  price: "123.23$",
  images: [],
  isBooked: true,
};

class CarModel {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn().mockResolvedValue([car]);
  static findById = jest.fn().mockResolvedValue(car);
  static findByIdAndUpdate = jest.fn().mockResolvedValue(car);
  static findByIdAndDelete = jest.fn().mockResolvedValue(true);
}

describe("CarsService", () => {
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: getModelToken("Car"),
          useValue: CarModel,
        },
      ],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findOne", () => {
    it("Test 1: should return an array of car", () => {
      expect(service.findAll())
        .resolves.toEqual([car])
        .catch((e) => console.log(e));
    });
  });

  describe("findOne", () => {
    it("Test 1: should return a car", () => {
      expect(service.findOne("456e3254"))
        .resolves.toEqual(car)
        .catch((e) => console.log(e));
    });
  });

  describe("findOne", () => {
    it("Test 1: should create a car", () => {
      expect(service.create({ ...car }))
        .resolves.toEqual(car)
        .catch((e) => console.log(e));
    });
  });

  describe("update", () => {
    it("Test 1: should update a car", () => {
      expect(service.update("456e3254", { ...car }))
        .resolves.toEqual(car)
        .catch((e) => console.log(e));
    });
  });

  describe("delete", () => {
    it("Test 1: should delete a car", () => {
      expect(service.delete("456e3254"))
        .resolves.toEqual(true)
        .catch((e) => console.log(e));
    });
  });
});
