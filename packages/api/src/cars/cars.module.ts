import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MulterModule } from "@nestjs/platform-express";
import { CarsController } from "./cars.controller";
import { CarsService } from "./cars.service";
import { Car, CarSchema } from "./schemas/car.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
