import { Module } from '@nestjs/common';
import { UltilAuth } from 'src/ultils/ultil.auth';
import { UltilCommon } from './ultil.common';

@Module({
  exports: [UltilAuth, UltilCommon],
  providers: [UltilAuth, UltilCommon],
})
export class UltilModule {}
