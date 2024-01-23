import { Controller } from '@nestjs/common';
import { SendEmailDto } from './mail.interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('mail')
export class MailController {
  constructor(
    @InjectQueue('emailSending') private readonly emailQueue: Queue,
  ) {}

  async sendEmail(dto: SendEmailDto) {
    await this.emailQueue.add('verification', dto);
  }
}
