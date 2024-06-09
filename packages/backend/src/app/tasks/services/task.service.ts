import { Injectable } from '@nestjs/common';
import { Equal, Repository } from 'typeorm';
import Task from '../task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskType } from '../models/task-type';
import { User } from '../../users/user.entity';
import { StepService } from '../../steps/services/step.service';
import { StepType } from '../../steps/models/step-type';


type TaskData = {
  title: string;
  description: string;
  status?: TaskType;
}

type CreateByAIData = {
  title: string;
  steps: stepData[];
};

type stepData = {
  title: string;
}

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private stepService: StepService,
  ) {}

  public async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  public async findOneByUserId(userId: string): Promise<Task[]> {
    return this.taskRepository.find({ where: { userId: userId }, relations: ['steps'] });
  }

  public async findOne(id: string): Promise<Task> {
    try {
      return this.taskRepository.findOneBy( { id: Equal( id ) } );
    }catch ( error ) {
      throw new Error(error);
    }
  }

  public async create(user: User, taskData: TaskData): Promise<Task> {
    try {
      const newTask = this.taskRepository.create({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        user: user,
      });
      await this.taskRepository.save(newTask);
      return newTask;
    }catch ( error ) {
      throw new Error(error);
    }
  }

  public async update(id: string, taskData: TaskData): Promise<Task> {
    try {
      const task = await this.taskRepository.findOneBy( { id: Equal( id ) } );
      task.title = taskData.title;
      task.description = taskData.description;
      task.status= taskData.status;
      await this.taskRepository.save(task);
      return task;
    }catch ( error ) {
      throw new Error(error);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const task = await this.taskRepository.findOneBy( { id: Equal( id ) } );
      await this.taskRepository.remove(task);
    }catch ( error ) {
      throw new Error(error);
    }
  }

  public async getAI(question: string): Promise<any> {
    // AI logic here
    try {
      const response = await fetch(
        'https://api.fastgpt.in/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.AIKEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chatId: 'abed',
            stream: false,
            detail: false,
            messages: [
              {
                content: question,
                role: 'user',
              },
            ],
          }),
        }
      );
      const json = await response.json();
      const string = json.choices[0].message.content;
      const result = JSON.parse(string);
      // 检查解析结果是否是数组
      return {
        steps: Array.isArray(result) ? result : [],
      };
    } catch (e) {
      return {
        steps: []
      }
    }
  }

  public async createByAI(userId: string, createByAIData: CreateByAIData) {
    try {
      const newTask = this.taskRepository.create({
        title: createByAIData.title,
        description: 'ai generated',
        userId: userId,
        status: TaskType.UNFINISHED,
      });
      await this.taskRepository.save(newTask);
      for(const step of createByAIData.steps) {
        await this.stepService.createByTaskId(newTask.id, { title: step.title, description: '', status: StepType.UNFINISHED });
      }
      return newTask;
    }catch ( error ) {
      throw new Error(error);
    }
  }
}
