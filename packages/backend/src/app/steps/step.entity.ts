import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { DefaultEntity } from '../../libs/entities/default.entity';
import Task from '../tasks/task.entity';
import { StepType } from './models/step-type';

@Entity()
class Step extends DefaultEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum',  enum: StepType, default: StepType.UNFINISHED})
  status: StepType;

  @ManyToOne(() => Task, (task) => task.steps)
  task: Task;

  @RelationId((step: Step) => step.task)
  @Column({ type: 'uuid', nullable: true })
  taskId: string;
}

export default Step;
