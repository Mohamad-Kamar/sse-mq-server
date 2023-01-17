import { CreateConsumerDto } from 'src/consumer/dto/create-consumer.dto';
import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';
import {
  ConsumerCollection,
  Message,
  MessageCollection,
  QueueCollection,
} from './IStorage_Types';

export interface IStorage {
  reset(): boolean;
  getQueues(): QueueCollection;
  getConsumers(): ConsumerCollection;
  getMessages(): MessageCollection;
  createQueue(queueDetails: CreateQueueDto): boolean;
  createConsumer(consumerDetails: CreateConsumerDto): boolean;
  createMessage(messageDetails: Message): boolean;
  deleteQueue(queueKey: string): boolean;
}
