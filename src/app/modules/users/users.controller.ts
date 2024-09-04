import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Controller('/v1')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/users/register')
  async create(@Body() data: CreateUserDto) {
    const create = await this.userService.create(data);
    return {
      status: 'Success',
      data: create,
      message: 'User Created Successfully'
    };
  }

  @UseGuards(AuthGuard)
  @Get('/users')
  async getAll(@Request() data) {
    return this.userService.getAll();
  }
  @Get('/user/id/:id')
  async getById(@Param() id: string) {
    return this.userService.getById({ id });
  }

  @Get('/user/email/:email')
  async getByEmail(@Param() email: string) {
    return this.userService.getByemail({ email });
  }
}
