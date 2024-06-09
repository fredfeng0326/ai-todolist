import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import TokenPayload from '../interfaces/token-payload.interface';
import { jwtConstants } from '../constants';
import { UsersService } from '../../users/services/user.serice';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: TokenPayload) {
    return this.userService.findOneById(payload.id);
  }
}
