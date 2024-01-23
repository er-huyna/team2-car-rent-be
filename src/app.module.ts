import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './common/config/database.config';
import redisConfig from './common/config/redis.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [databaseConfig, redisConfig] }),
    DatabaseModule,
    UserModule,
    AuthModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
