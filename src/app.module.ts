import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration, { selectTypeormConfig } from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from './features/security';
import { SeanceModule } from './features/seance/seance.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRoot({ ...selectTypeormConfig() }),
    UserModule,
    SecurityModule,
    SeanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
