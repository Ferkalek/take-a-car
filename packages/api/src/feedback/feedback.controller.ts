import { Body, Controller, Post } from "@nestjs/common";
import { IRentCarDTO } from "~/cars/car.interface";
import { SendMailService } from "./send-mail.service";

@Controller("feedback")
export class FeedbackController {
  constructor(private readonly sendMailService: SendMailService) {}

  @Post("request-for-rent")
  sendEmail(@Body() rentCar: IRentCarDTO): Promise<any> {
    return this.sendMailService.mailer(rentCar);
  }
}
