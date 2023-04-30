import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendSigninNotificationEmail(to: string): Promise<boolean> {
    await this.mailerService.sendMail({
      to,
      from: process.env.NODEMAILER_FROM_EMAIL,
      subject: "Vevericka Sign In",
      template: "signin",
      context: {
        name: to,
      },
    });

    return true;
  }
}
