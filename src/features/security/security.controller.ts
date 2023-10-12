import { Body, Controller, Post } from '@nestjs/common';
import { SecurityService } from './security.service';
import { UserCredential, UserToken } from './user.model';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('security')
@Controller('')
export class SecurityController {
  constructor(
    private readonly $security: SecurityService,
    private readonly $jwt: JwtService,
  ) {}

  @Post('/signIn')
  async signInAction(
    @Body() { email, password }: UserCredential,
  ): Promise<UserToken> {
    const user = await this.$security.signIn(email, password);

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.$jwt.sign(payload, { expiresIn: '8h' }),
      user,
    } as UserToken;
  }

  @Post('/register')
  async registerAction(@Body() { email }: any): Promise<UserToken> {
    const user = await this.$security.register(email);

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.$jwt.sign(payload, { expiresIn: '8h' }),
      user,
    } as UserToken;
  }
}
