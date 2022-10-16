import { Consumers, Consumer } from '../../Types';
import { CreateQueueDto } from '../dto/create-queue.dto';

export interface IQueue {
  queueDetails: CreateQueueDto;
  consumers: Consumers;
  addConsumer(): string;
  getConsumer(consumerID: string): Consumer;
  publish(message: string): void;
}
