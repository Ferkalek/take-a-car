import { Module } from "@nestjs/common";
import { NodemailerModule } from "@iaminfinity/nodemailer/dist/nodemailer.module";
import { FeedbackController } from "./feedback.controller";
import { SendMailService } from "./send-mail.service";

import * as dotenv from "dotenv";
dotenv.config();

@Module({
  imports: [
    NodemailerModule.register({
      host: "smtp.yandex.ru",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    }),
  ],
  controllers: [FeedbackController],
  providers: [SendMailService],
})
export class FeedbackModule {}
