import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { SeanceEntity } from './seance.entity';
import { SeanceController } from './seance.controller';
import { SeanceService } from './seance.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([SeanceEntity, UserEntity]), UserModule],
  controllers: [SeanceController],
  providers: [SeanceService],
  exports: [SeanceService],
})
export class SeanceModule {}
