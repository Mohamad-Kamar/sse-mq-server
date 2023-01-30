import { Injectable } from '@nestjs/common';
import { MongoStorage } from '../Storage/MongoStorage/MongoStorage';
import { CreateConsumerDto } from '../consumer/dto/create-consumer.dto';
import { InstaceConsumer } from '../consumer/dto/instance-consumer.dto';
import { CreateQueueDto } from '../queue/dto/create-queue.dto';
import { IQueue } from '../queue/entities/IQueue';
import { QueueFactory } from '../queue/entities/QueueFactory';
import { IStorage } from '../Storage/IStorage/IStorage';
import {
  ConsumerCollection,
  Message,
  MessageCollection,
  QueueCollection,
} from '../Storage/IStorage/IStorage_Types';
import { LocalStorage } from '../Storage/LocalStorage/LocalStorage';
import {
  InstanceConsumerCollection,
  InstanceMessage,
  InstanceMessageCollection,
  InstanceQueueCollection,
} from '../Types';
import { ConfigModule } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  storage: IStorage;
  messages: InstanceMessageCollection;
  consumers: InstanceConsumerCollection;
  queues: InstanceQueueCollection;

  reset() {
    this.messages = {};
    this.consumers = {};
    this.queues = {};
    this.storage.reset();
  }

  async loadStorage() {
    await ConfigModule.envVariablesLoaded;
    const storageType = process.env.STORAGE_TYPE || 'local';
    this.storage =
      storageType === 'mongodb' ? new MongoStorage() : new LocalStorage();

    await this.storage.initialize();
    const storedMessages = await this.storage.getMessages();
    this.messages = this.structureMessages(storedMessages);

    const storedConsumers = await this.storage.getConsumers();
    this.consumers = this.structureConsumers(storedConsumers);

    const storedQueues = await this.storage.getQueues();
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
      const consumer = instanceConsumers[instanceMessage.consumerID];
      if (consumer) consumer.addMessage(instanceMessage);
      else this.storage.deleteMessage(instanceMessage.messageID);
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
      instanceQueues[instanceConsumer.queueKey].addConsumer(instanceConsumer);
    });

    return instanceQueues;
  }

  getMessages() {
    return this.messages;
  }

  deleteMessage(instanceMessage: InstanceMessage) {
    this.storage.deleteMessage(instanceMessage.messageID);
  }

  removeMessage(instanceMessage: InstanceMessage) {
    const consumer = this.getConsumer(instanceMessage.consumerID);
    consumer.deleteMessage(instanceMessage.messageID);
    delete this.messages[instanceMessage.messageID];
  }

  addMessage(instanceMessage: InstanceMessage) {
    const consumer = this.getConsumer(instanceMessage.consumerID);
    if (!consumer) return;
    consumer.addMessage(instanceMessage);
    this.messages[instanceMessage.messageID] = instanceMessage;
  }

  saveMessage(messageBody: Message) {
    this.storage.createMessage(messageBody);
  }
  retrieveMessages() {
    return this.storage.getMessages();
  }
  getConsumer(consumerID: string): InstaceConsumer {
    return this.consumers[consumerID];
  }
  getConsumers() {
    return this.consumers;
  }
  deleteConsumer(consumerID: string) {
    this.storage.deleteConsumer(consumerID);
  }
  saveConsumer(createConsumerDto: CreateConsumerDto) {
    this.storage.createConsumer(createConsumerDto);
  }
  retrieveConsumers() {
    return this.storage.getConsumers();
  }
  getQueue(queueKey: string): IQueue {
    return this.queues[queueKey];
  }
  getQueues() {
    return this.queues;
  }
  retrieveQueues() {
    return this.storage.getQueues();
  }
  saveQueue(queueDetails: CreateQueueDto): boolean {
    this.storage.createQueue(queueDetails);
    return true;
  }
  deleteQueue(queueKey: string) {
    const currQueue = this.queues[queueKey];
    const currQueueConsumerIDs = Object.keys(currQueue.consumers);
    currQueueConsumerIDs.forEach((id) => {
      this.deleteConsumer(id);
      currQueue.deleteConsumer(id);
    });
    delete this.queues[queueKey];
    this.storage.deleteQueue(queueKey);
  }
}
