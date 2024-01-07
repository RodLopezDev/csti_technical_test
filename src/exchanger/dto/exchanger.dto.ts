import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ExchangerDto {
  @ApiProperty({ default: 15 })
  @IsNumber()
  amount: number;

  @ApiProperty({ default: 'PEN' })
  @IsString()
  sourceCurrency: string;

  @ApiProperty({ default: 'USD' })
  @IsString()
  targetCurrency: string;
}
