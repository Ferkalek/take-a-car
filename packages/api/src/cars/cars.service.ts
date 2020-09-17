import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { InjectSendGrid, SendGridService } from "@ntegral/nestjs-sendgrid";

import { ICarDTO } from "./car.interface";
import { Car } from "./schemas/car.schema";

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name) private readonly carModel: Model<Car>,
    @InjectSendGrid() private readonly client: SendGridService
  ) {}

  sendMailFunc(id: string) {
    console.log("-- 5 -- sendEmail", id);
    // or we can return a promise and doing "then(...) into a controller"
    return this.client.send({
      to: "ferkalekanton@gmail.com",
      from: "ferkalekanton@gmail.com",
      subject: "Whant rent a car!",
      text: `I want to rent a car ${id}`,
      html: `<h1>I want to rent a car ${id}</h1>`,
    });
    // .then((d) => {
    //   console.log(".... doing something else after sending an email", d);
    // })
    // .catch((e) => {
    //   console.log("Error sending an email:", e);
    // });
  }

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
    return await this.carModel.findByIdAndUpdate(id, car, { new: true });
  }
}
