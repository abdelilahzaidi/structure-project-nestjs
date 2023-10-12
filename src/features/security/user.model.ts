import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user/user.entity';

export type UserBll = Omit<UserEntity, 'password'>;

export class UserToken {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  user: UserBll;
}

export class UserCredential {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
