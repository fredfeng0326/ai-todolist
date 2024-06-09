import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../../auth/guards/jwt-auth.guard';
import { StepService } from '../services/step.service';
import Step from '../step.entity';
import RequestWithUser from '../../auth/interfaces/request-with-user.interface';
import { StepDto, UpdateDto } from '../dtos/step.dto';

@ApiTags('step')
@Controller('step')
@UseGuards(JwtAuthGuard)
export class StepController {
  constructor (private readonly stepService: StepService) {
  }

  @ApiResponse({
    status: 200,
    type: Step,
  })
  @Get('')
  async getSteps() {
    return this.stepService.findAll();
  }

  @ApiResponse({
    status: 200,
    type: Step,
  })
  @Get(':id')
  async getStepByUserId(@Param('id') id: string) {
    return this.stepService.getById(id);
  }

  @ApiResponse({
    status: 200,
    type: Step,
  })
  @Get(':taskId')
  async getStepByTaskId(@Param('taskId') taskId: string) {
    return this.stepService.getByTaskId(taskId);
  }

  @ApiResponse({
    status: 200,
    type: Step,
  })
  @Post('create')
  async createStep(
    @Request() req: RequestWithUser,
    @Body() stepDto: StepDto,
  ) {
    return this.stepService.createByTaskId(stepDto.taskId, {title: stepDto.title, description: stepDto.description, status: stepDto.status});
  }

  @ApiResponse({
    status: 200,
    type: Step,
  })
  @Put(':id')
  async updateStepById(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    return this.stepService.update(id, updateDto);
  }

  @ApiResponse({
    status: 200,
    type: Step,
  })
  @Delete(':id')
  async deleteStepById(@Param('id') id: string) {
    return this.stepService.delete(id);
  }
}
