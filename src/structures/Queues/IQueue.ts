import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';
import { Consumer, Consumers } from 'src/Types';

export interface IQueue {
  queueDetails: CreateQueueDto;
  consumers: Consumers;
  addConsumer(): Consumer;
  publish(message: string): void;
}
