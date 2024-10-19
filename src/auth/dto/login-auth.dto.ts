import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @ApiProperty({ default: 'MY_USER' })
  user: string;

  @IsString()
  @ApiProperty({ default: 'demo-nest-pwd-ex' })
  password: string;
}
