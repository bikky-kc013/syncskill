import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { Runner } from 'src/core/types/global';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private user: Repository<User>) {}
  async create({ data }: { data: CreateUserDto }) {
    try {
      const createUser = this.user.create({
        id: crypto.randomUUID().slice(0, 12),
        ...data
      });
      const savedUser = await this.user.save(createUser);
      return savedUser;
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    return await this.user.find();
  }

  async getById({ id }: { id: string }) {
    return await this.user.findOne({ where: { id: id } });
  }

  async getByUsername({ username }: { username: string }) {
    return await this.user.findOne({ where: { username: username } });
  }

  async getByemail({ email }: { email: string }) {
    return await this.user.findOne({
      where: { email: email },
      select: [
        'email',
        'password',
        'profile_image',
        'username',
        'id',
        'name',
        'type',
        'registredAt'
      ]
    });
  }
}
