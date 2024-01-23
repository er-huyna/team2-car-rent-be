import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailController } from './mail.controller';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from './mail.processor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'emailSending',
    }),
  ],
  controllers: [MailController],
  providers: [MailController, EmailProcessor],
  exports: [MailController],
})
export class MailModule {}
