import { IsEnum, IsString, } from 'class-validator';
import { StepType } from '../models/step-type';

export class StepDto {
  @IsString()
  taskId: string;

  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsEnum(StepType)
  status: StepType;
}

export class UpdateDto {
  @IsString()
  title: string;

  @IsEnum(StepType)
  status: StepType;
}

export class SimpleStepDto {
  @IsString()
  title: string;
}
