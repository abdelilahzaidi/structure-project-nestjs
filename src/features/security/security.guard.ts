import {
  CanActivate,
  ExecutionContext,
  Global,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { selectJwtSecret } from '../../../config';

@Global()
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly $jwt: JwtService,
    @InjectRepository(UserEntity)
    private readonly $user: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const headers: any = httpContext.getRequest().headers;

    let token = headers['Authorization'];
    if (!token) {
      throw new UnauthorizedException();
    }

    token = token.replace('Bearer ', '');

    try {
      const payload = await this.$jwt.verifyAsync(token, {
        secret: selectJwtSecret(),
      });

      context['user'] = await this.$user.findOneBy({ id: payload.id });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
