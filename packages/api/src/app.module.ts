import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";
import { CarsModule } from "./cars/cars.module";

import config from "@env/config";

@Module({
  imports: [MongooseModule.forRoot(config.mongoURL), CarsModule],
})
export class AppModule {}
