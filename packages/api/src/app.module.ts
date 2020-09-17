import { Module } from "@nestjs/common";
import * as path from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { MongooseModule } from "@nestjs/mongoose";
// import { NodemailerModule } from "@iaminfinity/nodemailer/dist/nodemailer.module";

import { CarsModule } from "./cars/cars.module";
import { FeedbackModule } from "./feedback/feedback.module";

import config from "@env/config";

@Module({
  imports: [
    // NodemailerModule.register({
    //   host: "smtp.yandex.ua",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: "anton.ferkalek@yandex.ru",
    //     pass: "kapito4ka",
    //   },
    //   from: '"Whant to rent a car" <anton.ferkalek@yandex.ru>',
    // }),
    MongooseModule.forRoot(config.mongoURL),
    CarsModule,
    FeedbackModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve("./public"),
      renderPath: "*",
      exclude: ["/cars*"],
    }),
  ],
})
export class AppModule {}
