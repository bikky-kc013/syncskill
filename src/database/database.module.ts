import { Module } from '@nestjs/common';
import ORMHelper from './helper/ORMHelper';

@Module({
  imports: [],
  providers: [ORMHelper],
  exports: [ORMHelper],
})
export class DatabaseModule {}
