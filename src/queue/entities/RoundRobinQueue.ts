import { IQueue } from './IQueue';
import { v4 as uuidv4 } from 'uuid';
import { InstanceConsumerCollection } from '../../Types';
import { CreateQueueDto } from '../dto/create-queue.dto';
import { CreateConsumerDto } from '../../consumer/dto/create-consumer.dto';
import { AlreadyExistsError } from '../../structures/Errors/AlreadyExistsError';
import { InstaceConsumer } from '../../consumer/dto/instance-consumer.dto';

export class RoundRobinQueue implements IQueue {
  consumers: InstanceConsumerCollection;
  queueKey: string;
  queueType: string;
  currentIndex: number;

  constructor(queueKey: string, queueType: string) {
    this.queueKey = queueKey;
    this.queueType = queueType;
    this.consumers = {};
    this.currentIndex = 0;
  }

  getConsumers(): InstanceConsumerCollection {
    return this.consumers;
  }

  addConsumer(instanceConsumer: InstaceConsumer): void {
    this.consumers[instanceConsumer.consumerID] = instanceConsumer;
  }

  getConsumer(consumerID: string): InstaceConsumer {
    return this.consumers[consumerID];
  }

  deleteConsumer(consumerID: string) {
    delete this.consumers[consumerID];
  }

  getPublishingConsumers(): InstaceConsumer[] {
    const currentKeys = Object.keys(this.consumers);
    this.currentIndex = this.currentIndex % currentKeys.length;
    const targetID = currentKeys[this.currentIndex];
    const targetConsumer = this.consumers[targetID];
    if (!targetConsumer) return [];
    this.currentIndex = (this.currentIndex + 1) % currentKeys.length;
    return [targetConsumer];
  }
}
