import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService]
})
export class UsersModule {}
