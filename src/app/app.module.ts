import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/config/config.module';
import { UsersModule } from './modules/users/users.module';
import { UploadModule } from './modules/upload/upload.module';
import { AuthenticationService } from './modules/authentication/authentication.service';
import { AuthenticationModule } from './modules/authentication/authentication.module';
@Module({
  imports: [AuthenticationModule,AppConfigModule, UsersModule, UploadModule],
  controllers: [],
  providers: [AuthenticationService],
})
export class AppModule {}
