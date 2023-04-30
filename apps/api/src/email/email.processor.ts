import { MailerService } from "@nestjs-modules/mailer";
import { OnQueueCompleted, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor("emails")
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(private readonly mailerService: MailerService) {}

  @OnQueueCompleted()
  async onQueueCompleted(job: Job) {
    this.logger.log(`Job ${job.name} completed at ${new Date().toISOString()}`);
  }

  @Process("sendSigninNotificationEmail")
  async sendSigninNotificationEmail(job: Job) {
    const { to, name } = job.data;
    await this.mailerService.sendMail({
      to,
      from: process.env.NODEMAILER_FROM_EMAIL,
      subject: "Vevericka Sign In",
      template: "signin",
      context: {
        name,
      },
    });
  }
}
