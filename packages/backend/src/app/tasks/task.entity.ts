import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { DefaultEntity } from '../../libs/entities/default.entity';
import { User } from '../users/user.entity';
import Step from '../steps/step.entity';
import { TaskType } from './models/task-type';

@Entity()
class Task extends DefaultEntity {
    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'enum',  enum: TaskType, default: TaskType.UNFINISHED})
    status: TaskType;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;

    @RelationId((task: Task) => task.user)
    @Column({ type: 'uuid', nullable: true })
    userId: string;

    @OneToMany(() => Step, (step) => step.task)
    steps: Step[];
}

export default Task;
