import { CreateConsumerDto } from 'src/consumer/dto/create-consumer.dto';
import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';
import { IStorage } from '../IStorage/IStorage';
import {
  ConsumerCollection,
  Message,
  MessageCollection,
  QueueCollection,
} from '../IStorage/IStorage_Types';

export class LocalStorage implements IStorage {
  queues: QueueCollection;
  consumers: ConsumerCollection;
  messages: MessageCollection;
  constructor(queues = {}, consumers = {}, messages = {}) {
    this.queues = queues;
    this.consumers = consumers;
    this.messages = messages;
  }
  reset(): boolean {
    this.queues = {};
    this.consumers = {};
    this.messages = {};
    return true;
  }
  getQueues(): QueueCollection {
    return this.queues;
  }

  getConsumers(): ConsumerCollection {
    return this.consumers;
  }
  getMessages(): MessageCollection {
    return this.messages;
  }

  createQueue(queueDetails: CreateQueueDto): boolean {
    this.queues[queueDetails.queueKey] = queueDetails;
    return true;
  }

  createConsumer(consumerDetails: CreateConsumerDto): boolean {
    this.consumers[consumerDetails.consumerID] = consumerDetails;
    return true;
  }

  createMessage(messageDetails: Message): boolean {
    this.messages[messageDetails.messageID] = messageDetails;
    return true;
  }

  deleteQueue(queueKey: string) {
    delete this.queues[queueKey];
    return true;
  }
}
