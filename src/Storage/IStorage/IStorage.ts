import { CreateConsumerDto } from 'src/consumer/dto/create-consumer.dto';
import { CreateQueueDto } from '../../queue/dto/create-queue.dto';
import {
  ConsumerCollection,
  Message,
  MessageCollection,
  QueueCollection,
} from './IStorage_Types';

export interface IStorage {
  initialize(): Promise<void>;
  reset(): boolean;
  getQueues(): QueueCollection;
  getConsumers(): ConsumerCollection;
  getMessages(): MessageCollection;
  createQueue(queueDetails: CreateQueueDto): boolean;
  createConsumer(consumerDetails: CreateConsumerDto): boolean;
  createMessage(messageDetails: Message): boolean;
  deleteConsumer(consumerID: string): boolean;
  deleteQueue(queueKey: string): boolean;
  deleteMessage(messageID: string): boolean;
}
