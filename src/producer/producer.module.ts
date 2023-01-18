import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';

@Module({
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule {}
