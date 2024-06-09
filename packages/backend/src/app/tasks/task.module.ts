import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from './task.entity';
import { TaskService } from './services/task.service';
import { StepModule } from '../steps/step.module';

@Module({
  controllers: [TaskController],
  imports: [
    TypeOrmModule.forFeature([Task]),
    StepModule,
  ],
  providers: [TaskService],
  exports: [TaskService],
})

export class TaskModule {}
