import { InstaceConsumerDto } from './consumer/dto/instance-consumer.dto';
import { IQueue } from './queue/entities/IQueue';

interface Constructable<T> {
  new (...args: any): T;
}

export type QueueConstructableClass = Constructable<IQueue>;

export type Message = {
  messageID: string;
  consumerID: string;
  messageContent: string;
  durable: boolean;
};

export type MessageCollection = {
  [messageID: string]: Message;
};

export type ConsumerCollection = {
  [consumerID: string]: InstaceConsumerDto;
};

export type QueueCollection = {
  [queueKey: string]: IQueue;
};
