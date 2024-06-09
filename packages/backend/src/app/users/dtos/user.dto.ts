import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'username',
    example: 'testUser'
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'password',
    example: 'Pass@123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
