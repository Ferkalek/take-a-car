import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ICarDTO } from "./car.interface";
import { Car } from "./schemas/car.schema";

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private readonly carModel: Model<Car>) {}

  async findAll(): Promise<ICarDTO[]> {
    return await this.carModel.find();
  }

  async findOne(id: string): Promise<ICarDTO> {
    return await this.carModel.findById(id);
  }

  async create(car: ICarDTO): Promise<ICarDTO> {
    const newCar = new this.carModel(car);
    return await newCar.save();
  }

  async delete(id: string): Promise<ICarDTO> {
    return await this.carModel.findByIdAndDelete(id);
  }

  async update(id: string, car: ICarDTO): Promise<ICarDTO> {
    console.log("-- 5.1 update");
    return await this.carModel.findByIdAndUpdate(id, car, { new: true });
  }
}
