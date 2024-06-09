import { IsArray, IsEnum, IsString } from 'class-validator';
import { TaskType } from '../models/task-type';
import { SimpleStepDto } from '../../steps/dtos/step.dto';

export class TaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(TaskType)
  status: TaskType;
}

export class AIDto {
  @IsString()
  question: string;
}

export class CreateByAIDto {
  @IsString()
  title: string;

  @IsArray()
  steps: SimpleStepDto[];
}
