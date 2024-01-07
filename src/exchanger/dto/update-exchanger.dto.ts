import { PartialType } from '@nestjs/swagger';
import { CreateExchangerDto } from './create-exchanger.dto';

export class UpdateExchangerDto extends PartialType(CreateExchangerDto) {}
