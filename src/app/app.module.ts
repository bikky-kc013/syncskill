import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/config.module';
import { UsersModule } from './modules/users/users.module';
import { UploadModule } from './modules/upload/upload.module';
@Module({
  imports: [AppConfigModule, UsersModule, UploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
