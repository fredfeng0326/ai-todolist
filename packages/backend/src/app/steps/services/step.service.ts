import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import Step from '../step.entity';
import { StepType } from '../models/step-type';

@Injectable()
export class StepService {
  constructor(
    @InjectRepository(Step)
    private stepRepository: Repository<Step>,
  ) {}

  async findAll() {
    return this.stepRepository.find();
  }

  async getById(id: string) {
    const step = await this.stepRepository.findOneBy( { id: Equal( id ) } );
    if (step) {
      return step;
    }
    throw new NotFoundException();
  }

  async getByTaskId(taskId: string) {
    const steps = await this.stepRepository.find({ where: { task: { id: Equal( taskId ) } } });
    if (steps.length > 0) {
      return steps;
    }
    throw new NotFoundException();
  }

  async createByTaskId(taskId: string, stepData: { title: string, description: string, status: StepType }) {
    const step = this.stepRepository.create({
      title: stepData.title,
      description: stepData.description,
      status: stepData.status,
      task: { id: taskId },
    });
    await this.stepRepository.save(step);
    return step;
  }

  async update(id: string, stepData: { title: string, status: StepType }) {
    const step = await this.stepRepository.findOneBy( { id: Equal( id ) } );
    step.title = stepData.title;
    step.status = stepData.status;
    await this.stepRepository.save(step);
    return step;
  }

  async delete(id: string) {
    const step = await this.stepRepository.findOneBy( { id: Equal( id ) } );
    if (step) {
      await this.stepRepository.remove(step);
      return step;
    }
    throw new NotFoundException();
  }

}
