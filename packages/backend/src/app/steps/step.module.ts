import { Module } from '@nestjs/common';
import { StepController } from './controllers/step.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Step from './step.entity';
import { StepService } from './services/step.service';

@Module({
  controllers: [StepController],
  imports: [
    TypeOrmModule.forFeature([Step]),
  ],
  providers: [StepService],
  exports: [StepService],
})
export class StepModule {}
