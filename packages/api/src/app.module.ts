import { Module } from "@nestjs/common";
import * as path from "path";
import { ServeStaticModule } from "@nestjs/serve-static";

import { MongooseModule } from "@nestjs/mongoose";
import { CarsModule } from "./cars/cars.module";

import config from "@env/config";

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURL),
    CarsModule,
    ServeStaticModule.forRoot({
      rootPath: path.join("./public"),
    }),
  ],
})
export class AppModule {}
