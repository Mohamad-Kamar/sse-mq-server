import { CreateConsumerDto } from 'src/consumer/dto/create-consumer.dto';
import { CreateQueueDto } from '../../queue/dto/create-queue.dto';
import {
  ConsumerCollection,
  Message,
  MessageCollection,
  QueueCollection,
} from './IStorage_Types';

export interface IStorage {
  initialize(): void | Promise<void>;
  reset(): boolean | Promise<boolean>;
  getQueues(): QueueCollection | Promise<QueueCollection>;
  getConsumers(): ConsumerCollection | Promise<ConsumerCollection>;
  getMessages(): MessageCollection | Promise<MessageCollection>;
  createQueue(queueDetails: CreateQueueDto): boolean | Promise<boolean>;
  createConsumer(
    consumerDetails: CreateConsumerDto,
  ): boolean | Promise<boolean>;
  createMessage(messageDetails: Message): boolean | Promise<boolean>;
  deleteConsumer(consumerID: string): boolean | Promise<boolean>;
  deleteQueue(queueKey: string): boolean | Promise<boolean>;
  deleteMessage(messageID: string): boolean | Promise<boolean>;
}
