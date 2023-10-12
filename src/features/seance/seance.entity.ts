import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from '../user/user.entity';

@Entity('Seance')
export class SeanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  coursId: number;
  @Column({ nullable: false })
  date: Date;
  @Column('time')
  startAt: Date;
  @Column('time')
  endAt: Date;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  participants: UserEntity[];
}
