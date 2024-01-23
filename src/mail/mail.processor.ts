import { Process, Processor } from '@nestjs/bull';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './mail.interface';
import * as path from 'path';
import * as hbs from 'nodemailer-express-handlebars';
import { Job } from 'bull';

@Processor('emailSending')
export class EmailProcessor {
  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILDEV_INCOMING_HOST,
      port: parseInt(<string>process.env.MAILDEV_INCOMING_PORT),
      secure: false,
      auth: {
        user: process.env.MAILDEV_INCOMING_USER,
        pass: process.env.MAILDEV_INCOMING_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });
    return transporter;
  }

  @Process('verification')
  async sendVerificationLink(dataJob: Job<SendEmailDto>) {
    const transport = this.mailTransport();

    const handlebarOptions = {
      viewEngine: {
        extname: '.handlebars',
        partialsDir: path.resolve('./src/mail/template'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./src/mail/template'),
      extname: '.handlebars',
    };

    transport.use('compile', hbs(handlebarOptions));

    const { from, recipients, subject, context } = dataJob.data;

    const options = {
      from: from ?? {
        name: process.env.APP_NAME,
        address: process.env.DEFAULT_MAIL_FROM,
      },
      to: recipients,
      subject,
      template: 'email',
      context: context,
    };

    try {
      const result = await transport.sendMail(options);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
