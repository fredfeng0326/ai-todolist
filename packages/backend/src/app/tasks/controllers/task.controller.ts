import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import Task from '../task.entity';
import RequestWithUser from '../../auth/interfaces/request-with-user.interface';
import { AIDto, CreateByAIDto, TaskDto } from '../dtos/task.dto';
import JwtAuthGuard from '../../auth/guards/jwt-auth.guard';

@ApiTags('task')
@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor (private readonly taskService: TaskService) {
  }

  @ApiResponse({
    status: 200,
    type: Task,
  })
  @Get(':id')
  async getTask(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    type: Task,
  })
  @Post('create')
  async createTask(
    @Request() req: RequestWithUser,
    @Body() taskDto: TaskDto,
  ) {
    if(!req.user) throw new Error('User not found');
    return this.taskService.create(req.user, taskDto);
  }

  @ApiResponse({
    status: 200,
    type: Task,
    isArray: true,
  })
  @Get('')
  async getByUserId(@Request() req: RequestWithUser) {
    if(!req.user) throw new Error('User not found');
    return this.taskService.findOneByUserId(req.user.id);
  }

  @ApiResponse({
    status: 200,
    type: Task,
  })
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() taskDto: TaskDto) {
    return this.taskService.update(id, taskDto);
  }

  @ApiResponse({
    status: 200,
    type: Task,
  })
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.taskService.delete(id);
  }

  @ApiResponse({
    status: 200,
  })
  @Post('ai')
  async getAI(@Body() aIDto: AIDto) {
    return this.taskService.getAI(aIDto.question);
  }

  @ApiResponse({})
  @Post('create-by-ai')
  async createByAI(@Request() req: RequestWithUser, @Body() createByAIDto: CreateByAIDto) {
    return this.taskService.createByAI(req.user.id, createByAIDto);
  }
}
