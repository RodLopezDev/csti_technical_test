import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateExchangeRateDto {
  @ApiProperty({ default: 'PEN' })
  @IsString()
  sourceCurrency: string;

  @ApiProperty({ default: 'USD' })
  @IsString()
  targetCurrency: string;

  @ApiProperty({ default: 0.27 })
  @IsNumber()
  rate: number;
}
