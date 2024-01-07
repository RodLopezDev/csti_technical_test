import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @ApiProperty({ default: 'user' })
  user: string;

  @IsString()
  @ApiProperty({ default: 'password' })
  password: string;
}
