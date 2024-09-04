import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { PassportLocalGuard } from 'src/core/guards/passport-local.guard';

@Controller('/v1')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @UseGuards(PassportLocalGuard)
  @Post('login')
  async login(@Request() req) {
    const user = await this.authenticationService.signIn({
      id: req.id,
      type: req.type
    });
    return {
      status: 'Success',
      accessToken: user,
      message: 'Logged In'
    };
  }
}
