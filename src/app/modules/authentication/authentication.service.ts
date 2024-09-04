import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface USERACCESS {
  id: string;
  type: string;
}
@Injectable()
export class AuthenticationService {
  constructor(
    private userservice: UsersService,
    private jwtService: JwtService
  ) {}

  async authenticate(data: LoginUserDto) {
    const validate = await this.validate(data);
    if (!validate) throw new UnauthorizedException();
    const token = this.signIn(validate);
    return token
  }

  async validate(data: LoginUserDto) {
    const user = await this.userservice.getByemail({ email: data.email });
      if (!user) throw new NotFoundException();
    if (user && bcrypt.compare(data.password, user.password)) {
      return {
        id: user.id,
        type: 'user'
      };
    }
    return null;
  }
  async signIn(data: USERACCESS) {
    const tokenPayload = {
      id: data.id,
      type: data.type
    };
    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return accessToken;
  }
}
