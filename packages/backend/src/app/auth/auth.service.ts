import { Inject, Injectable, forwardRef, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/services/user.serice';
import { JwtService } from '@nestjs/jwt';
import TokenPayload from './interfaces/token-payload.interface';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public getJwtToken(
    user: User,
  ) {
    const payload: TokenPayload = {
      id: user.id,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }

  public getCookieSettings = () => ({
    secure: false,
    expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'strict' as any,
  });

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('not invalid password');
    }
  }

  public async getAuthenticatedUser(
    username: string,
    plainTextPassword: string
  ) {
    try {
      const user = await this.usersService.getByUsernameAndGetPassword(
        username
      );
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new BadRequestException('No user found');
    }
  }
}
