import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';
import { JwtModule } from '@nestjs/jwt';
import { selectJwtExpiresIn, selectJwtSecret } from '../../../config';
import { UserEntity } from '../user/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: selectJwtSecret(),
      signOptions: { expiresIn: selectJwtExpiresIn() },
    }),
    UserModule,
  ],
  controllers: [SecurityController],
  providers: [SecurityService],
})
export class SecurityModule {}
