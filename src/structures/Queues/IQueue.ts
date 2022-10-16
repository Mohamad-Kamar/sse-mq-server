import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';
import { Consumer } from 'src/Types';

export interface IQueue {
  queueDetails: CreateQueueDto;
  consumers: Array<Consumer>;
  addConsumer(): Consumer;
  publish(message: string): void;
}
