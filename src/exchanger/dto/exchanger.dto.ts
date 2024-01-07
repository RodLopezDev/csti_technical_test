import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ExchangerDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  sourceCurrency: string;

  @ApiProperty()
  @IsString()
  targetCurrency: string;
}
