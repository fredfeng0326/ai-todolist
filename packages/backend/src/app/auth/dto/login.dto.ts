import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'username',
    example: 'testUser',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'password',
    example: 'Pass@123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
