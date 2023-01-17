import { InstaceConsumerDto } from 'src/consumer/dto/instance-consumer.dto';
import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';
import {
  ConsumerCollection,
  Message,
  MessageCollection,
  QueueCollection,
} from '../../Types';
import { IStorage } from '../IStorage/IStorage';

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

  getQueue(queueKey: string): CreateQueueDto {
    return this.queues[queueKey];
  }

  getQueueCosumers(queueKey: string): ConsumerCollection {
    const matchingConsumers: ConsumerCollection = {};
    Object.values(this.consumers).forEach((consumer: InstaceConsumerDto) => {
      if (consumer.queueKey === queueKey) {
        matchingConsumers[consumer.consumerID] = consumer;
      }
    });
    return matchingConsumers;
  }

  createQueue(queueDetails: CreateQueueDto): boolean {
    this.queues[queueDetails.queueKey] = queueDetails;
    return true;
  }

  getConsumer(consumerID: string): InstaceConsumerDto {
    return this.consumers[consumerID];
  }

  createConsumer(consumerDetails: InstaceConsumerDto): boolean {
    this.consumers[consumerDetails.consumerID] = consumerDetails;
    return true;
  }

  getConsumerMessages(consumerID: string): MessageCollection {
    const matchingMessages: MessageCollection = {};
    Object.values(this.messages).forEach((message: Message) => {
      if (message.consumerID === consumerID) {
        matchingMessages[message.messageID] = message;
      }
    });
    return matchingMessages;
  }

  getMessage(messageID: string): Message {
    return this.messages[messageID];
  }

  createMessage(messageDetails: Message): boolean {
    this.messages[messageDetails.messageID] = messageDetails;
    return true;
  }
}
