import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('emails') private readonly emailsQueue: Queue) {}

  async sendSigninNotificationEmail(
    to: string,
    name: string,
  ): Promise<boolean> {
    await this.emailsQueue.add('sendSigninNotificationEmail', { to, name });
    return true;
  }
}
