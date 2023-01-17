import { CreateConsumerDto } from 'src/consumer/dto/create-consumer.dto';
import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';

export type ConsumerCollection = {
  [consumerID: string]: CreateConsumerDto;
};

export type QueueCollection = {
  [queueKey: string]: CreateQueueDto;
};

export type Message = {
  messageID: string;
  messageContent: string;
  durable: boolean;
  consumerID: string;
};

export type MessageCollection = {
  [messageID: string]: Message;
};
