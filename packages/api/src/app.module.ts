import { Module } from "@nestjs/common";
import * as path from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { SendGridModule } from "@ntegral/nestjs-sendgrid";
import { MongooseModule } from "@nestjs/mongoose";
import { CarsModule } from "./cars/cars.module";

import config from "@env/config";

@Module({
  imports: [
    MongooseModule.forRoot(config.mongoURL),
    CarsModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve("./public"),
      renderPath: "*",
      exclude: ["/cars*"],
    }),
    SendGridModule.forRoot({
      apiKey: config.sendGridApiKey,
    }),
  ],
})
export class AppModule {}
