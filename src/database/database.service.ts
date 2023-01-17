import { Injectable } from '@nestjs/common';
import { CreateConsumerDto } from 'src/consumer/dto/create-consumer.dto';
import { InstaceConsumer } from 'src/consumer/dto/instance-consumer.dto';
import { CreateQueueDto } from 'src/queue/dto/create-queue.dto';
import { IQueue } from 'src/queue/entities/IQueue';
import { QueueFactory } from 'src/queue/entities/QueueFactory';
import { IStorage } from 'src/Storage/IStorage/IStorage';
import {
  ConsumerCollection,
  Message,
  MessageCollection,
  QueueCollection,
} from 'src/Storage/IStorage/IStorage_Types';
import { LocalStorage } from 'src/Storage/LocalStorage/LocalStorage';
import {
  InstanceConsumerCollection,
  InstanceMessage,
  InstanceMessageCollection,
  InstanceQueueCollection,
} from '../Types';

@Injectable()
export class DatabaseService {
  storage: IStorage;
  messages: InstanceMessageCollection;
  consumers: InstanceConsumerCollection;
  queues: InstanceQueueCollection;

  constructor() {
    console.log('LOADING DATABASE SERVICE');
    this.storage = new LocalStorage();
    this.loadStorage();
  }

  getQueue(queueKey: string): IQueue {
    return this.queues[queueKey];
  }

  reset() {
    this.messages = {};
    this.consumers = {};
    this.queues = {};
    this.storage.reset();
  }

  loadStorage() {
    const storedMessages = this.storage.getMessages();
    this.messages = this.structureMessages(storedMessages);

    const storedConsumers = this.storage.getConsumers();
    this.consumers = this.structureConsumers(storedConsumers);

    const storedQueues = this.storage.getQueues();
    this.queues = this.structureQueues(storedQueues);
  }

  structureMessages(
    storedMessages: MessageCollection,
  ): InstanceMessageCollection {
    const instanceMessages: InstanceMessageCollection = {};
    Object.values(storedMessages).forEach((storedMessage) => {
      const { messageID, consumerID, messageContent, durable } = storedMessage;
      instanceMessages[storedMessage.messageID] = {
        messageID,
        consumerID,
        durable,
        messageEvent: new MessageEvent('message', { data: messageContent }),
      };
    });
    return instanceMessages;
  }

  structureConsumers(
    storedConsumers: ConsumerCollection,
  ): InstanceConsumerCollection {
    const instanceConsumers: InstanceConsumerCollection = {};
    // Create hollow consumers without their message collections
    Object.values(storedConsumers).forEach((consumer) => {
      instanceConsumers[consumer.consumerID] = new InstaceConsumer(
        consumer.queueKey,
        consumer.consumerID,
      );
    });

    // Add Message collections to consumers
    Object.values(this.messages).forEach((instanceMessage) => {
      instanceConsumers[instanceMessage.consumerID].addMessage(instanceMessage);
    });

    return instanceConsumers;
  }

  structureQueues(storedQueues: QueueCollection): InstanceQueueCollection {
    const instanceQueues: InstanceQueueCollection = {};
    // Create hollow queue without their consumer collections
    Object.values(storedQueues).forEach((queue) => {
      instanceQueues[queue.queueKey] = QueueFactory.createQueue(queue);
    });

    // Add consumer collections to queues
    Object.values(this.consumers).forEach((instanceConsumer) => {
      instanceQueues[instanceConsumer.consumerID].addConsumer(instanceConsumer);
    });

    return instanceQueues;
  }

  getMessages() {
    return this.messages;
  }
  getConsumers() {
    return this.consumers;
  }
  getQueues() {
    return this.queues;
  }

  saveConsumer(createConsumerDto: CreateConsumerDto) {
    this.storage.createConsumer(createConsumerDto);
  }

  saveQueue(queueDetails: CreateQueueDto): boolean {
    this.storage.createQueue(queueDetails);
    return true;
  }

  deleteQueue(queueKey: string) {
    this.storage.deleteQueue(queueKey);
  }

  addMessage(instanceMessage: InstanceMessage) {
    this.messages[instanceMessage.messageID] = instanceMessage;
  }

  saveMessage(messageBody: Message) {
    this.storage.createMessage(messageBody);
  }
}
