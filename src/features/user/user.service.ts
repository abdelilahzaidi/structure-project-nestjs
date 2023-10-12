import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly $user: Repository<UserEntity>,
  ) {}

  async findAllByIds(ids: number[]): Promise<UserEntity[]> {
    return await this.$user.findBy({ id: In(ids) });
  }
}
