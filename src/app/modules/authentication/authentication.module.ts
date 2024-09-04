import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalGuard } from 'src/core/strategies/local-strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'ssss',
      signOptions: {
        expiresIn: '1d'
      }
    }),
    PassportModule
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalGuard],
  exports: [AuthenticationService]
})
export class AuthenticationModule {}
