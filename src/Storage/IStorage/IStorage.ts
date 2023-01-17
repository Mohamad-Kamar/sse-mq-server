import { CreateConsumerDto } from 'src/consumer/dto/create-consumer.dto';
import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';
import { InstanceMessage, InstanceMessageCollection } from 'src/Types';
import { ConsumerCollection, QueueCollection } from './IStorage_Types';

export interface IStorage {
  reset(): boolean;
  getQueues(): QueueCollection;
  getConsumers(): ConsumerCollection;
  getMessages(): InstanceMessageCollection;
  createQueue(queueDetails: CreateQueueDto): boolean;
  createConsumer(consumerDetails: CreateConsumerDto): boolean;
  createMessage(messageDetails: InstanceMessage): boolean;
}
