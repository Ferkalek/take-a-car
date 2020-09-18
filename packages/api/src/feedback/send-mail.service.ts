import { Injectable } from "@nestjs/common";
import { NodemailerService } from "@iaminfinity/nodemailer/dist/nodemailer.service";

import { IRentCarDTO } from "~/cars/car.interface";

@Injectable()
export class SendMailService {
  constructor(private readonly nodemailerService: NodemailerService) {}

  mailer(rentCar: IRentCarDTO) {
    const { id, title, userName, userContact } = rentCar;

    return this.nodemailerService.sendMail({
      from: `"Want to rent a car" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER_TO,
      subject: "Want to rent a car.",
      // text: `I whant to rent a car ${rentCar.title}`,
      html: `
        <p>My congratulations!</p>
        <p>User <b>${userName}</b> wants to rent a car <b>${title}</b></p>
        <p>User asks to contact with him via <b>${userContact}</b></p>
        <br>
        <p>You can see the car that user is interested in <a href="https://lit-fjord-03729.herokuapp.com/car/${id}">show the car</a></p>
      `,
    });
  }
}
