import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({name: 'security_user'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  @Column()
  status: string;

  @BeforeInsert()
  cryptPassword() {
    this.password = bcrypt.hashSync(this.password, 40);
  }
}
