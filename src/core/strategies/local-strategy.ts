import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from 'src/app/modules/authentication/authentication.service';


@Injectable()
export class LocalGuard extends PassportStrategy(Strategy, 'local-strategy') {
  constructor(private authservice: AuthenticationService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string) {
    const user = await this.authservice.validate({
      email: username,
      password,
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
