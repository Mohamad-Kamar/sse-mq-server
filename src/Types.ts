import { InstaceConsumer } from './consumer/dto/instance-consumer.dto';
import { CreateQueueDto } from './queue/dto/create-queue.dto';
import { IQueue } from './queue/entities/IQueue';

interface Constructable<T> {
  new (...args: any): T;
}

export type QueueConstructableClass = Constructable<IQueue>;

export type InstanceMessage = {
  messageID: string;
  consumerID: string;
  messageContent: string;
  durable: boolean;
};

export type InstanceMessageCollection = {
  [messageID: string]: InstanceMessage;
};

export type InstanceConsumerCollection = {
  [consumerID: string]: InstaceConsumer;
};

export type QueueCollection = {
  [queueKey: string]: CreateQueueDto;
};

export type InstanceQueueCollection = {
  [queueKey: string]: IQueue;
};
