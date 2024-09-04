import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const authorization = request.headers.authorization;
    if (!authorization) throw new Error('Token Missing');
    const token = authorization.split(' ')[1];
    if (!token) throw new UnauthorizedException();
    try {
      const tokenData = await this.jwtService.verifyAsync(token);
      http.getRequest().user = {
        id: tokenData.id,
        type: tokenData.type
      };
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
