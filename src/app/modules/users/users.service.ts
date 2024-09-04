import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user-dto';
import ORMHelper from 'src/database/helper/ORMHelper';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly ormHelper: ORMHelper
  ) {}
  async create(data: CreateUserDto) {
    const runner = await this.ormHelper.createQueryRunner();
    try {
      await runner.startTransaction();
      const create = await this.userRepository.create({ data });
      await runner.commitTransaction();
      return create;
    } catch (error) {
      throw error;
    } finally {
      await runner.release();
    }
  }
  async getAll() {
    try {
      return await this.userRepository.getAll();
    } catch (error) {
      throw error;
    }
  }
  async getById({ id }: { id: string }) {
    return this.userRepository.getById({ id });
  }
  async getByUsername({ username }: { username: string }) {
    return this.userRepository.getByUsername({ username });
  }
  async getByemail({ email }: { email: string }) {
    return this.userRepository.getByemail({ email });
  }
}
