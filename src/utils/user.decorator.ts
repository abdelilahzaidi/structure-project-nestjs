import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../features/user/user.entity';

function userFactory(data, ctx: ExecutionContext): UserEntity {
  return ctx['user'];
}

export const GetUser = createParamDecorator(userFactory);
