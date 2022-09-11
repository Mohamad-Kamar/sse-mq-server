import { PartialType } from '@nestjs/mapped-types';
import { CreateProducerDto } from './create-producer.dto';

export class UpdateProducerDto extends PartialType(CreateProducerDto) {}
