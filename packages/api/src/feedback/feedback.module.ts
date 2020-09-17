import { Module } from "@nestjs/common";
import { NodemailerModule } from "@iaminfinity/nodemailer/dist/nodemailer.module";
import { FeedbackController } from "./feedback.controller";
import { SendMailService } from "./send-mail.service";

@Module({
  imports: [
    NodemailerModule.register({
      host: "smtp.yandex.ru",
      port: 587,
      secure: false,
      auth: {
        user: "anton.ferkalek@yandex.ru",
        pass: "kapito4ka",
      },
    }),
  ],
  controllers: [FeedbackController],
  providers: [SendMailService],
})
export class FeedbackModule {}
