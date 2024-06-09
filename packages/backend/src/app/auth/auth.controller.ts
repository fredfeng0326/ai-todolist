import { Body, Controller, Post, UseGuards, Request, Response, Get } from '@nestjs/common';
import { User } from '../users/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import RequestWithUser from './interfaces/request-with-user.interface';
import { Response as ExpressResponse } from 'express';
import JwtAuthGuard from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiResponse({
    status: 200,
    type: User,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() _loginDto: LoginDto,
    @Request() req: RequestWithUser,
    @Response() res: ExpressResponse,
  ) {
    const { user } = req
    const token = this.authService.getJwtToken(user);
    res.cookie('Authentication', token, this.authService.getCookieSettings());
    user.password = undefined;
    return res.send(user);
  }

  @ApiResponse({
    status: 200,
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Request() req: RequestWithUser) {
    if (req?.user) {
      return req.user;
    }
  }
}
