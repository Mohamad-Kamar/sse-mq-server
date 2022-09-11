import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ProducerController } from './producer.controller';
import { QueueModule } from '../queue/queue.module';

@Module({
  controllers: [ProducerController],
  imports: [QueueModule],
  providers: [ProducerService],
})
export class ProducerModule {}
