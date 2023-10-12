import { Global, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserBll } from './user.model';
import { UserEntity } from '../user/user.entity';

@Global()
@Injectable()
export class SecurityService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly $user: Repository<UserEntity>,
  ) {}

  async signIn(email: string, password: string): Promise<UserBll> {
    const client = await this.$user.findOneBy({ email });
    if (!client) {
      throw new UnauthorizedException();
    }

    if (!bcrypt.compareSync(password, client.password)) {
      throw new UnauthorizedException();
    }

    return this.mapEntityToBll(client);
  }

  private mapEntityToBll(entity: UserEntity): UserBll {
    const { id, email, status } = entity;
    return { id, email, status } as UserBll;
  }

  async register(email: string) {
    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync('Test1234=', salt);

    const user = await this.$user.save({ email, password, status: 'blop' });

    return this.mapEntityToBll(user);
  }
}
