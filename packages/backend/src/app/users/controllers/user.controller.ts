import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put, Request,
  UseGuards
} from '@nestjs/common';
import { User } from '../user.entity';
import { UsersService } from '../services/user.serice';
import JwtAuthGuard from '../../auth/guards/jwt-auth.guard';
import RequestWithUser from '../../auth/interfaces/request-with-user.interface';

@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @ApiResponse({
    status: 200,
    type: User,
  })
  @Get('')
  async getUsers() {
    return this.userService.getUsers();
  }

  @ApiResponse({
    status: 200,
    type: User,
  })
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @ApiResponse({
    status: 200,
    type: User,
  })
  @Put()
  async updateUser(@Request() req: RequestWithUser, @Body() user: User) {
    return this.userService.updateUser(req.user.id, user);
  }

  @ApiResponse({
    status: 200,
    type: User,
  })
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
