import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './common/config/database.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ load: [databaseConfig] }), DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
