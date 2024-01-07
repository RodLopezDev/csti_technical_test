import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateExchangeRateDto {
  @ApiProperty()
  @IsString()
  sourceCurrency: string;

  @ApiProperty()
  @IsString()
  targetCurrency: string;

  @ApiProperty()
  @IsNumber()
  rate: number;
}
