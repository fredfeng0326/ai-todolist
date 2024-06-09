import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany
} from 'typeorm';
import { DefaultEntity } from '../../libs/entities/default.entity';
import Task from '../tasks/task.entity';

@Entity()
export class User extends DefaultEntity {
  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @Column({ default: false })
  isAdmin: boolean;
}
