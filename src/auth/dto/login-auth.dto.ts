import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  @ApiProperty({ default: 'RODRIGO' })
  user: string;

  @IsString()
  @ApiProperty({ default: 'test-to-csti' })
  password: string;
}
