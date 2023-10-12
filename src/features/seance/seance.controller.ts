import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Repository } from 'typeorm';
import { SeanceEntity } from './seance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';

@ApiTags('Sceance')
@Controller('seance')
export class SeanceController {
  constructor(
    @InjectRepository(SeanceEntity)
    private readonly $seance: Repository<SeanceEntity>,
    private readonly $user: UserService,
  ) {}
  @Get(['', '/'])
  async getAllAction() {
    return await this.$seance.find();
  }

  @Post(['', '/'])
  async createAction(@Body() seance: SeanceEntity) {
    return this.$seance.save({ ...seance });
  }

  @Patch([':id/participants'])
  async insertParticipantAction(
    @Param('id') id: number,
    @Body() { userIds }: any,
  ) {
    const seance = await this.$seance.findOneBy({ id });
    const users = await this.$user.findAllByIds(userIds);

    if (!seance.participants) {
      seance.participants = [];
    }
    seance.participants.push(...users);

    return this.$seance.save(seance);
  }

  @Get([':id/participants'])
  async getNbParticipants(@Param('id') id: number) {
    const seance = await this.$seance.findOne({
      where: { id },
      relations: ['participants'],
    });

    return { nb: seance.participants.length };
  }
}
